export default function AboutUs() {
  return (
    <>
      <div className="flex justify-end">
        <div className="relative">
          <div className="slanted-edge" />
          <div className="absolute right-0 top-0">
            <div className="w-full p-4 text-white">
              <p className="text-center text-xl">
                O que é{' '}
                <span className="font-semibold text-app-primary">Celebra</span>?
              </p>
              <p className="mt-4 text-sm">
                Celebra é uma marca que conecta fornecedores e consumidores para
                facilitar a organização de eventos e festas, auxiliando tanto
                pessoas que buscam serviços confiáveis para eventos de pequeno e
                médio porte quanto prestadores de serviços que desejam ampliar
                seu alcance e divulgar seu trabalho.
              </p>

              <p className="mt-16 font-semibold">
                Nossa missão é ajudar pessoas a comemorar momentos especiais de
                forma prática, confiável e acessível.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
