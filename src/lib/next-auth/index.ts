import { Adapter } from 'next-auth/adapters'
import { Theme, type NextAuthOptions } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import { createTransport } from 'nodemailer'
import { PrismaAdapter } from '@auth/prisma-adapter'

import { prisma } from '@/config/prisma'

import { env } from '../env/index.mjs'

export const authOptions: NextAuthOptions = {
  providers: [
    EmailProvider({
      server: {
        host: env.SMTP_HOST,
        port: 587,
        auth: {
          user: env.SMTP_USER,
          pass: env.SMTP_PASS,
        },
        from: 'contato@nanofy.com.br',
      },
      async sendVerificationRequest(params) {
        const { identifier, url, provider, theme } = params
        const { host } = new URL(url)

        const transport = createTransport(provider.server)

        const result = await transport.sendMail({
          to: identifier,
          from: 'no-reply@nanofy.com.br',
          subject: 'Verificação de E-mail',
          text: text({ url, host }),
          html: html({ url, host, theme }),
        })

        const failed = result.rejected.concat(result.pending).filter(Boolean)

        if (failed.length) {
          throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`)
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma) as Adapter,
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    jwt: async ({ user, token, trigger, session }) => {
      if (user) {
        token.id = user.id
        token.role = user.role
      }

      if (trigger === 'update') {
        token = { ...token, ...session }

        return token
      }

      return token
    },
    session: async ({ session, token }) => {
      session.user.id = token.id
      session.user.role = token.role

      return session
    },
  },
}

type HTMLParams = {
  url: string
  host: string
  theme: Theme
}

function html(params: HTMLParams) {
  const { url, host, theme } = params

  const escapedHost = host.replace(/\./g, '&#8203;.')

  const brandColor = theme.brandColor || '#000'

  const color = {
    background: '#f9f9f9',
    text: '#444',
    mainBackground: '#fff',
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: theme.buttonText || '#fff',
  }

  return `
    <body style="background: ${color.background};">
      <table width="100%" border="0" cellspacing="20" cellpadding="0"
        style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
        <tr>
          <td align="center"
            style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
            Fazer Login em <strong>${escapedHost}</strong>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding: 20px 0;">
            <table border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                    target="_blank"
                    style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
                    in</a></td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center"
            style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
            Se você não solicitou este e-mail, pode ignorá-lo com segurança.
          </td>
        </tr>
      </table>
    </body>
  `
}

type TextParams = {
  url: string
  host: string
}

function text({ url, host }: TextParams) {
  return `Autenticar-se em ${host}\n${url}\n\n`
}
