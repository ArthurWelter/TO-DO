const formatador = (data) => {
    return {
      dia: {
        numerico: dayjs(data).format('DD'),
        semana: {
          curto: dayjs(data).format('ddd'),
          longo: dayjs(data).format('dddd')
        }
      },
      mes: dayjs(data).format('MMMM'),
      hora: dayjs(data).format('HH:mm'),
    }
  }
  
  // formatador(new Date('2024-07-15'))
  
  const atividade1 = {
    nome: "Almoço",
    data: new Date("2024-07-08 10:00"),
    finalizada: true
  }
  
  let atividades = [
    atividade1,
    {
      nome: "Academia em grupo",
      data: new Date("2024-07-09 12:00"),
      finalizada: true
    },
    
  ]
  
  const criarItemDeAtividade = (atividade) => {
    let input = `<input type="checkbox" onchange="concluirAtividade(event)" 
    value="${atividade.data}"
    `
    if (atividade.finalizada){
      input += 'checked'
    }
    input += '>'
  
    const formatar = formatador(atividade.data)
  
    return `
    <div class="card-bg" oncontextmenu="deletarElemento(event)">
      ${input}
  
      <div>
      <svg class="active" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path d="M7.50008 10L9.16675 11.6667L12.5001 8.33335M18.3334 10C18.3334 14.6024 14.6025 18.3334 10.0001 18.3334C5.39771 18.3334 1.66675 14.6024 1.66675 10C1.66675 5.39765 5.39771 1.66669 10.0001 1.66669C14.6025 1.66669 18.3334 5.39765 18.3334 10Z" stroke="#BEF264" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
  
      <svg class="inactive" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.41664 1.81836C9.46249 1.61597 10.5374 1.61597 11.5833 1.81836M11.5833 18.1817C10.5374 18.3841 9.46249 18.3841 8.41664 18.1817M14.6741 3.10086C15.5587 3.70022 16.3197 4.46409 16.9158 5.35086M1.8183 11.5834C1.6159 10.5375 1.6159 9.46255 1.8183 8.4167M16.8991 14.6742C16.2998 15.5588 15.5359 16.3198 14.6491 16.9159M18.1816 8.4167C18.384 9.46255 18.384 10.5375 18.1816 11.5834M3.1008 5.32586C3.70016 4.44131 4.46403 3.68026 5.3508 3.0842M5.3258 16.8992C4.44124 16.2998 3.6802 15.536 3.08414 14.6492" stroke="#A1A1AA" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
  
  
  
      
      <span>${atividade.nome}</span>
      </div>
      
      <time class="full">
       ${formatar.dia.semana.longo},
       dia ${formatar.dia.numerico}
       de ${formatar.mes} 
       às ${formatar.hora}h
      </time>
      <time class="short">
       ${formatar.dia.semana.curto},
       ${formatar.dia.numerico} <br>
       ${formatar.hora}
      </time>
    </div> `
  }
  
  
  
  const atualizarListaDeAtividades = () => {
    const section = document.querySelector('section')
    section.innerHTML = ''
  
    if(atividades.length == 0){
      section.innerHTML = `<p class="lista-vazia">Nenhuma atividade cadastrada.</p>`
      return
    }
  
    for (let atividade of atividades){
    section.innerHTML += criarItemDeAtividade(atividade)
  
    let limpar = document.querySelector('input#inputei')
    limpar.value = ''
    
  }
  }
  atualizarListaDeAtividades()
  
  const salvarAtividade = (event) => {
    event.preventDefault()
  
    const dadosDoFormulario = new FormData(event.target)
  
    const nome = dadosDoFormulario.get('atividade')
    const dia = dadosDoFormulario.get('dia')
    const hora = dadosDoFormulario.get('hora')
    const data = `${dia} ${hora}`
  
    const novaCoisinha = {
      nome: nome,
      data: data,
      finalizada: false
    }
  
    const atividadeExiste = atividades.find((atividade) => {
      return atividade.data == novaCoisinha.data
    })
  
    if (atividadeExiste){
      alert('Dia/Hora já estão ocupados.')
      return
    }
  
    atividades = [novaCoisinha, ...atividades]
    atualizarListaDeAtividades()
  }
  
  const criarDiasSelecao = () => {
    let dias = [
      "2024-07-14",
      "2024-07-15",
      "2024-07-16",
      "2024-07-17",
      "2024-07-18"
    ]
  
    let diasSelecao = ''
   
  
    for(let dia of dias){
      const formatar = formatador(dia)
      diasSelecao += `<option value="${dia}"> ${formatar.dia.numerico} de ${formatar.mes}
      </option>`
    }
  
    document.querySelector('select[name="dia"]').innerHTML = diasSelecao
  }
  
  criarDiasSelecao()
  
  const criarHorasSelecao = () => {
    let horasDisponiveis = ''
  
    for(var i = 5; i < 23; i++){
      const hora = String(i).padStart(2, '0')
      horasDisponiveis += `<option value="${hora}:00">${hora}:00</option>`
      horasDisponiveis += `<option value="${hora}:30">${hora}:30</option>`
    }
  
    document.querySelector('select[name="hora"]').innerHTML = horasDisponiveis
  }
  
  criarHorasSelecao()
  
  const concluirAtividade = (event) => {
    const input = event.target
    const dataDesseInput = input.value
  
    const atividade = atividades.find((atividade) => {
      return atividade.data == dataDesseInput
    }) 
    // se a atividade ja existir e eu estiver clicando o que deve acontecer?
  
    // 
    if(!atividade){
      return
    }
    atividade.finalizada = !atividade.finalizada
  }
  
  // const boraDeletar = indexOf(event.target)
  // atividades.splice(boraDeletar, 1)
  
  // const n1 = 1
  // const array = [
  //   1, 2, 3, 4
  // ]
  // array.splice(n1, 1)
  // alert(array)
  
  const deletarElemento = (event) =>{
    event.preventDefault()
  
    const element = event.target.value;
  
    const atividadeProcurada = atividades.find(atividade => atividade.data == element)
    const atividadeEncontrada = atividades.indexOf(atividadeProcurada)
  
    atividades.splice(atividadeEncontrada, 1)
    atualizarListaDeAtividades()
  }
  