import { Trabalhadores, Professor, Secrataria, RH, TI } from "./funcionarios"

document.addEventListener("DOMContentLoaded", () => {
    const buttonEntrar = document.querySelector('form')
    const homePage = document.querySelector('.home-page')
    const mainPage = document.querySelector('.main-page')

    buttonEntrar.addEventListener('submit', function (e) {
        e.preventDefault()
        const login = document.getElementById('login')
        const senha = document.getElementById('senha')

        if (login.value === 'marcelocarvalho@sl.com ' && senha.value === '123') {
            homePage.style.display = 'none'
            mainPage.style.display = 'flex'
        } else {
            alert('usuário e/ou senha incorreto')
        }
    })

    TrocaConteudo()
    PainelControle(Trabalhadores)
    FuncionariosCad()
    SelecionaOpcao()
    funcionariosAlt(Trabalhadores)
    Deletar(Trabalhadores)
    Holerite(Trabalhadores)
})

function TrocaConteudo() {
    const liItems = document.querySelectorAll('.main-page__side-bar__container__item')
    const contents = document.querySelectorAll('.main-page__content > div.main')
    const opcoes = document.querySelectorAll('.main-page__content__opcoes > div')
    const opcoesHolerite = document.querySelectorAll('.main-page__content__holerite__opcao > div')
    const opcoesPainel = document.querySelectorAll('.main-page__content__painel__opcoes > div')

    liItems.forEach((item, indice) => {
        item.addEventListener('click', () => {
            //removendo o modificador --active
            liItems.forEach(otherItem => {
                otherItem.classList.remove('main-page__side-bar__container__item--active');
            });
            //adicionando o modificador no item q foi clicado
            item.classList.add('main-page__side-bar__container__item--active');

            //oculta todos os conteudos
            contents.forEach(item => item.style.display = 'none')
            opcoes.forEach(item => item.style.display = 'none')
            opcoesHolerite.forEach(item => item.style.display = 'none')
            opcoesPainel.forEach(item => item.style.display = 'none')

            //mostra somente o conteudo referente ao indice
            contents[indice].style.display = 'flex';
        });
    });
}

function PainelControle(array) {
    const opcoes = document.querySelectorAll('.main-page__content__painel__container__item')
    const containerOpcoes = document.querySelectorAll('.main-page__content__painel__opcoes > div')
    const painel = document.querySelector('.main-page__content__painel')

    opcoes.forEach((item, indice) => {
        item.addEventListener('click', () => {
            painel.style.display = 'none'

            document.querySelector('.main-page__content__painel__opcoes').style.display = 'block'
            containerOpcoes.forEach(item => item.style.display = 'none')
            containerOpcoes[indice].style.display = 'block'
        })
    })

    const buttoncancel = document.querySelectorAll('.btn-cancelar-lancaHoras')

    buttoncancel.forEach(item => {
        item.addEventListener('click', () => {
            containerOpcoes.forEach(item => item.style.display = 'none')
            painel.style.display = 'flex'
            document.getElementById('colocaHora').style.display = 'none'
        })
    })

    const campoLancaHorario = document.getElementById('campoLancaHoras')
    const buttonLancaHoras = document.getElementById('searchLancaHoras')

    buttonLancaHoras.addEventListener('click', () => {
        document.getElementById('colocaHora').style.display = 'block'
        document.querySelector('.main-page__content__painel__opcoes__apontamentoHoras__search').style.display = 'none'
        document.querySelector('.btn-cancel1').style.display = 'none'

        const containerCampos = document.getElementById('colocaHora');
        containerCampos.innerHTML = ''

        nomePesquisado = campoLancaHorario.value.toLowerCase()

        const encontrado = array.find(item => item.nome === nomePesquisado)

        if (encontrado) {

            const titulo = document.createElement('h3')
            titulo.textContent = `funcionário: ${encontrado.nome}`
            containerCampos.appendChild(titulo)

            for (let i = 1; i <= 22; i++) {
                const divCampo = document.createElement('div');
                divCampo.classList.add('campo');

                const label = document.createElement('label');
                label.textContent = `Dia ${i}:`;

                const inputEntrada = document.createElement('input');
                inputEntrada.type = 'time';
                inputEntrada.id = `entrada${i}`;

                const inputSaida = document.createElement('input');
                inputSaida.type = 'time';
                inputSaida.id = `saida${i}`;

                divCampo.appendChild(label);
                divCampo.appendChild(inputEntrada);
                divCampo.appendChild(inputSaida);

                containerCampos.appendChild(divCampo);
            }
            const divButtons = document.createElement('div')
            divButtons.classList.add('buttons')

            const buttonCalcula = document.createElement('button')
            buttonCalcula.type = 'button'
            buttonCalcula.classList.add('button')
            buttonCalcula.classList.add('btn-calcula-hora')
            buttonCalcula.textContent = 'calcular'

            const buttonCancela = document.createElement('button')
            buttonCancela.type = 'button'
            buttonCancela.classList.add('button')
            buttonCancela.classList.add('btn-cancelar-lancaHoras2')
            buttonCancela.textContent = 'cancelar'

            divButtons.appendChild(buttonCancela)
            divButtons.appendChild(buttonCalcula)

            containerCampos.appendChild(divButtons)

            const calcularDiferencaMinutos = (horaInicial, horaFinal) => {
                const [horasInicial, minutosInicial] = horaInicial.split(':');
                const [horasFinal, minutosFinal] = horaFinal.split(':');

                const tempoInicialMinutos = parseInt(horasInicial) * 60 + parseInt(minutosInicial);
                const tempoFinalMinutos = parseInt(horasFinal) * 60 + parseInt(minutosFinal);

                return tempoFinalMinutos - tempoInicialMinutos;
            };

            const calcularHorasDiarias = (event) => {
                event.preventDefault();

                let totalHoras = 0;

                for (let i = 1; i <= 22; i++) {
                    const entrada = document.getElementById(`entrada${i}`).value;
                    const saida = document.getElementById(`saida${i}`).value;

                    const diferencaMinutos = calcularDiferencaMinutos(entrada, saida);
                    const horas = parseInt(Math.ceil(diferencaMinutos / 60));
                    totalHoras += horas;
                }

                encontrado.horasTotal = totalHoras
                alert('informações salvas')
                document.querySelector('.main-page__content__painel__opcoes__apontamentoHoras__search').style.display = 'flex'
                document.querySelector('.btn-cancel1').style.display = 'block'
                containerCampos.innerHTML = ''
            };

            document.querySelector('.btn-cancelar-lancaHoras2').addEventListener('click', () => {
                alert('operação cancelada')
                containerCampos.innerHTML = ''
                document.querySelector('.main-page__content__painel__opcoes__apontamentoHoras__search').style.display = 'flex'
                document.querySelector('.btn-cancel1').style.display = 'block'
            })

            document.querySelector('.btn-calcula-hora').addEventListener('click', calcularHorasDiarias)
        }
    })

    document.getElementById('searchLancaFerias').addEventListener('click', () => {
        const nomePesquisado = document.getElementById('campoLancaFerias')
        const encontrado = array.find(item => item.nome === nomePesquisado.value.toLowerCase())

        const corpoFerias = document.getElementById('colocaFerias')
        corpoFerias.innerHTML = ''
        if (encontrado) {
            document.querySelector('.main-page__content__painel__opcoes__apontamentoFerias__search__container').style.display = 'none'
            document.querySelector('.btn-lancaFerias').style.display = 'none'

            // Criando os elementos do formulário
            const form = document.createElement('form');
            form.classList.add('main-page__content__opcoes__cadastrar__form');
            form.classList.add('form-enviarFerias');

            const campos = [
                { label: 'Data de Início das Férias', id: 'dataInicio', type: 'date', required: true },
                { label: 'Data de Término das Férias', id: 'dataTermino', type: 'date', required: true }
            ];

            campos.forEach((campo) => {
                const divInput = document.createElement('div');
                divInput.classList.add('main-page__content__opcoes__cadastrar__form__input');

                const label = document.createElement('label');
                label.setAttribute('for', campo.id);
                label.textContent = campo.label;

                const input = document.createElement('input');
                input.id = campo.id;
                input.type = campo.type;
                if (campo.required) {
                    input.setAttribute('required', 'true');
                }

                divInput.appendChild(label);
                divInput.appendChild(input);
                form.appendChild(divInput);
            });

            // Botões "Cancelar" e "Salvar"
            const divEnviar = document.createElement('div');
            divEnviar.classList.add('main-page__content__opcoes__cadastrar__form__enviar');

            const btnCancelar = document.createElement('button');
            btnCancelar.classList.add('button', 'cancelar');
            btnCancelar.setAttribute('type', 'button');
            btnCancelar.textContent = 'Cancelar';

            const btnSalvar = document.createElement('button');
            btnSalvar.classList.add('button');
            btnSalvar.setAttribute('type', 'submit');
            btnSalvar.textContent = 'Salvar';

            divEnviar.appendChild(btnCancelar);
            divEnviar.appendChild(btnSalvar);
            form.appendChild(divEnviar);

            // Adicionando o formulário à página
            corpoFerias.appendChild(form);

            // Capturando os elementos do formulário
            const dataInicioInput = document.getElementById('dataInicio');
            const dataTerminoInput = document.getElementById('dataTermino');

            // Adicionando o evento de mudança ao campo de início das férias
            dataInicioInput.addEventListener('change', () => {
                // Obtendo a data de início das férias
                const dataInicio = new Date(dataInicioInput.value);

                // Adicionando um mês à data de início para calcular a data de término
                const umMesDepois = new Date(dataInicio.getFullYear(), dataInicio.getMonth() + 1, dataInicio.getDate());

                // Formatando a data de término para o formato 'YYYY-MM-DD'
                const ano = umMesDepois.getFullYear();
                let mes = umMesDepois.getMonth() + 1;
                mes = mes < 10 ? `0${mes}` : mes;
                let dia = umMesDepois.getDate();
                dia = dia < 10 ? `0${dia}` : dia;
                const dataTermino = `${ano}-${mes}-${dia}`;

                // Definindo o valor no campo de término das férias
                dataTerminoInput.value = dataTermino;

                // Tornando o campo de término das férias como somente leitura
                dataTerminoInput.readOnly = true;
            });

            // Adicionando o evento de mudança ao campo de início das férias
            dataInicioInput.addEventListener('change', () => {
                // Obtendo a data de início das férias
                const dataInicio = new Date(dataInicioInput.value);

                // Adicionando um mês à data de início para calcular a data de término
                const umMesDepois = new Date(dataInicio.getFullYear(), dataInicio.getMonth() + 1, dataInicio.getDate());

                // Formatando a data de término para o formato 'YYYY-MM-DD'
                const ano = umMesDepois.getFullYear();
                let mes = umMesDepois.getMonth() + 1;
                mes = mes < 10 ? `0${mes}` : mes;
                let dia = umMesDepois.getDate();
                dia = dia < 10 ? `0${dia}` : dia;
                const dataTermino = `${ano}-${mes}-${dia}`;

                // Definindo o valor no campo de término das férias
                dataTerminoInput.value = dataTermino;

                // Tornando o campo de término das férias como somente leitura
                dataTerminoInput.readOnly = true;
            });


            document.querySelector('.form-enviarFerias').addEventListener('submit', (event) => {
                event.preventDefault(); // Impedindo o recarregamento da página

                alert('ferias lançadas com sucesso')

                document.querySelector('.main-page__content__painel__opcoes__apontamentoFerias__search__container').style.display = 'flex'
                document.querySelector('.btn-lancaFerias').style.display = 'block'

                encontrado.ferias = ferias = {
                    dataInicio: dataInicioInput.value,
                    dataTermino: dataTerminoInput.value
                }
                console.log(encontrado)
                corpoFerias.innerHTML = ''
            })

        } else {
            alert('funcionario não encontrado')
        }
    })
}

function FuncionariosCad() {
    const inputs = document.querySelectorAll('.main-page__content__opcoes__cadastrar__form__input > input')
    const form = document.querySelector('.main-page__content__opcoes__cadastrar__form')
    const opcao = document.getElementById('profissoes')
    const buttonCancelar = document.querySelectorAll('.cancelar')

    let novoFuncionario = ''

    form.addEventListener('submit', (e) => {
        e.preventDefault()

        if (opcao.value === 'professor') {
            novoFuncionario = new Professor(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value)
            Trabalhadores.push(novoFuncionario)
        }

        if (opcao.value === 'Rh') {
            novoFuncionario = new RH(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value)
            Trabalhadores.push(novoFuncionario)
        }

        if (opcao.value === 'Ti') {
            novoFuncionario = new TI(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value)
            Trabalhadores.push(novoFuncionario)
        }

        if (opcao.value === 'secretaria') {
            novoFuncionario = new Secrataria(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value)
            Trabalhadores.push(novoFuncionario)
        }

        form.reset()
        alert(`Usuário ${novoFuncionario.nome} cadastrado com sucesso`)
    })

    buttonCancelar.forEach(item => {
        item.addEventListener('click', () => {
            //removendo o form da tela
            document.querySelector('.main-page__content__opcoes__cadastrar').style.display = 'none';
            document.querySelector('.main-page__content__opcoes__alterar').style.display = 'none';
            document.querySelector('.main-page__content__opcoes__deletar').style.display = 'none';

            //retornando a tela de escolha de opção
            document.querySelector('.main-page__content__funcionarios').style.display = 'flex';
        })
    })
}

function SelecionaOpcao() {
    const Lis = document.querySelectorAll('.main-page__content__funcionarios__nav__container__item')
    const opcoes = document.querySelectorAll('.main-page__content__opcoes > div')
    const containerItens = document.querySelector('.main-page__content__funcionarios')

    Lis.forEach((item, indice) => {
        item.addEventListener('click', () => {
            containerItens.style.display = 'none'

            document.querySelector('.main-page__content__opcoes').style.display = 'block';
            opcoes.forEach(item => item.style.display = 'none')
            opcoes[indice].style.display = 'block'
        })
    })
}

function funcionariosAlt(array) {
    const CampoSearch = document.getElementById('campoSearch');
    const buttonSearch = document.getElementById('buttonSearch');
    const corpoForm = document.querySelector('.main-page__content__opcoes__alterar__content');

    buttonSearch.addEventListener('click', () => {
        const nomePesquisado = CampoSearch.value.toLowerCase();

        const funcionarioEncontrado = array.find(item => item.nome.toLowerCase() === nomePesquisado);

        if (funcionarioEncontrado) {
            const form = document.createElement('form');
            form.classList.add('main-page__content__opcoes__alterar__content__container__form');

            for (const prop in funcionarioEncontrado) {
                const divInputGroup = document.createElement('div');
                divInputGroup.classList.add('main-page__content__opcoes__cadastrar__form__input');

                if (prop !== 'horasTotal') {
                    const label = document.createElement('label');
                    label.textContent = prop;
                    label.setAttribute('for', prop);

                    let input = null;

                    if (prop === 'cargo') {
                        input = document.createElement('select');
                        input.id = prop;
                        const options = ['Professor(a)', 'RH', 'TI', 'Secretaria(o)'];
                        options.forEach(optionText => {
                            const option = document.createElement('option');
                            option.value = optionText.toLowerCase();
                            option.textContent = optionText;

                            if (funcionarioEncontrado[prop].toLowerCase() === optionText.toLowerCase()) {
                                option.selected = true;
                            }

                            input.appendChild(option);
                        });
                    } else if (prop !== 'horaTotal') { // Condição para não criar input para 'horaTotal'
                        input = document.createElement('input');
                        input.id = prop;
                        input.name = prop;
                        input.value = funcionarioEncontrado[prop];
                    }

                    if (input !== null) {
                        divInputGroup.appendChild(label);
                        divInputGroup.appendChild(input);
                        form.appendChild(divInputGroup);
                    }
                }
            }

            const divButtons = document.createElement('div')
            divButtons.classList.add('buttons-form')

            const cancelButton = document.createElement('button');
            cancelButton.type = 'click';
            cancelButton.classList.add('button')
            cancelButton.textContent = 'cancelar';
            divButtons.appendChild(cancelButton);

            const submitButton = document.createElement('button');
            submitButton.type = 'submit';
            submitButton.classList.add('button')
            submitButton.textContent = 'Salvar';
            divButtons.appendChild(submitButton);

            form.appendChild(divButtons)

            corpoForm.innerHTML = '';
            corpoForm.appendChild(form);

            document.querySelector('.main-page__content__opcoes__alterar__footer').style.display = 'none';

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                for (const prop in funcionarioEncontrado) {
                    if (prop !== 'cargo') {
                        funcionarioEncontrado[prop] = form[prop].value;
                    } else {
                        const select = document.getElementById(prop);
                        funcionarioEncontrado[prop] = select.options[select.selectedIndex].textContent;
                    }
                }
                alert(`Dados do funcionário ${funcionarioEncontrado.nome} atualizados com sucesso!`);
                corpoForm.innerHTML = ''
                document.querySelector('.main-page__content__opcoes__alterar__footer').style.display = 'block';
            });

            cancelButton.addEventListener('click', () => {
                alert(`Operação cancelada`);
                corpoForm.innerHTML = ''
                document.querySelector('.main-page__content__opcoes__alterar__footer').style.display = 'block';
            })

            CampoSearch.addEventListener('input', () => {
                corpoForm.innerHTML = ''; // Limpa o conteúdo do formulário ao começar uma nova busca
                document.querySelector('.main-page__content__opcoes__alterar__footer').style.display = 'block';
            });

        } else {
            alert('Usuário não encontrado');
        }
    });
}

function Deletar(array) {
    const campoDelet = document.getElementById('deleteFunc');
    const buttonCancelar = document.getElementById('buttonDeletar');

    buttonCancelar.addEventListener('click', () => {
        const valor = campoDelet.value.toLowerCase();
        const funcionarioEncontradoIndex = array.findIndex(item => item.nome.toLowerCase() === valor);

        if (funcionarioEncontradoIndex !== -1) {
            const confirmar = confirm(`Tem certeza que deseja excluir o funcionário ${array[funcionarioEncontradoIndex].nome}?`);

            if (confirmar) {
                array.splice(funcionarioEncontradoIndex, 1);
                alert(`O funcionário ${valor} foi removido com sucesso.`);
            } else {
                alert('Operação cancelada.');
            }
        } else {
            alert('Usuário não encontrado');
        }
    });
}

function Holerite(array) {
    const nav = document.querySelectorAll('.main-page__content__holerite__opcoes__item');
    const opcoes = document.querySelectorAll('.main-page__content__holerite__opcao > div');
    const mainOpcoes = document.querySelector('.main-page__content__holerite');
    const FuncIndividual = document.getElementById('search-holerite');
    const buttonConfirmIndividual = document.getElementById('confirm-search-button');

    const buttonCancelarHolerite = document.querySelectorAll('.btn-cancelar-holerite');



    nav.forEach((item, indice) => {
        item.addEventListener('click', () => {
            mainOpcoes.style.display = 'none';
            opcoes[indice].style.display = 'block';
        });
    });

    buttonCancelarHolerite.forEach(item => {
        item.addEventListener('click', () => {
            opcoes.forEach(item => item.style.display = 'none');
            document.querySelector('.main-page__content__holerite').style.display = 'block';
        });
    });

    buttonConfirmIndividual.addEventListener('click', () => {
        const nomePesquisado = FuncIndividual.value.toLowerCase();
        const encontrado = array.find(item => item.nome.toLowerCase() === nomePesquisado);

        if (encontrado) {
            const campoFunc = document.getElementById('nomeFunc');
            const selectHolerite = document.getElementById('tipos-holerite');
            const horasTrab = document.getElementById('horasTrab');

            document.getElementById('holeriteIndividual').style.display = 'none';
            document.querySelector('.main-page__content__holerite__opcao__umFuncionario__form').style.display = 'block';

            campoFunc.value = encontrado.nome;
            campoFunc.readOnly = true;

            selectHolerite.addEventListener('change', () => {
                if (selectHolerite.value === 'decimoTerceiro' || selectHolerite.value === 'ferias') {
                    horasTrab.disabled = true; // Desativa o campo de horas trabalhadas
                    horasTrab.value = 150
                } else {
                    horasTrab.disabled = false; // Habilita o campo de horas trabalhadas
                }
            });
            const corpoTabelas = document.querySelector('.main-page__content__holerite__opcao__umFuncionario__content__tabelas');

            document.querySelector('.main-page__content__holerite__opcao__umFuncionario__form').addEventListener('submit', (e) => {
                e.preventDefault()

                let tabelasHTML = ''
                encontrado.horasTotal = 172
                let total = (encontrado.salario * encontrado.horasTotal).toFixed(2)
                let inss = parseFloat((total * 0.09).toFixed(2))
                let vt = parseFloat((total * 0.06).toFixed(2))
                let fgts = parseFloat((total * 0.08).toFixed(2))
                let liquido = (total - vt).toFixed(2)

                let totalFerias = (encontrado.salario * 176)
                let liquidoferias = parseFloat(totalFerias).toFixed(2)

                //selecionando o funcionario
                document.querySelector('.main-page__content__holerite__opcao__umFuncionario__form').style.display = 'none'
                document.querySelector('.main-page__content__holerite__opcao__umFuncionario > .main-page__header').style.display = 'none'

                if (selectHolerite.value === 'decimoTerceiro') {
                    tabelasHTML = `
                    <div class="box-princ">
                        <div class="box1">
                            <p>Empresa: <span>Startup Language</span></p>
                            <p>Competência: <span>12 - 2023</span></p>
                            <p>Descrição: <span>Pagamento - Dezembro 2023</span></p>
                        </div>
                        <div class="box2">
                            <p>Data de vencimento: <span>05/12/2023</span></p>
                            <p>Tipo de pagamento: <span>Pagamento de funcionário</span></p>
                            <p>Tipo de Cálculo: <span>Por funcionário</span></p>
                        </div>
                    </div>
                    <table class="first-table">
                        <thead>
                            <tr>
                                <th colspan="3" class="title">Proventos</th>
                            </tr>
                            <tr class="primary">
                                <td>Descrição</td>
                                <td>Referência</td>
                                <td>Valor</td>
                            </tr>
                            <tr class="secondary">
                                <td>Horas trabalhadas</td>
                                <td class="valores">${176}</td>
                                <td class="valores">${totalFerias}</td>
                            </tr>
                        </thead>
                    </table>
                    <table>
                        <thead>
                            <tr>
                                <th colspan="3" class="title">Deduções</th>
                            </tr>
                            <tr class="primary">
                                <td>Descrição</td>
                                <td>Referência</td>
                                <td>Valor</td>
                            </tr>
                            <tr class="secondary">
                                <td>FGTS</td>
                                <td class="valores">8%</td>
                                <td class="valores">${fgts}</td>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <td id="total" colspan="3">Total <span>${liquidoferias}</span></td>
                            </tr>
                        </tfoot>
                    </table>
                    <div class="buttons">
                        <button class="button button-naoEnvia">Cancelar</button>                    
                        <button class="button button-enviar-holerite">Enviar</button>
                    </div>
                `;
                } else {
                    if ('ferias' in encontrado) {
                        tabelasHTML = `
                        <div class="box-princ">
                            <div class="box1">
                                <p>Empresa: <span>Startup Language</span></p>
                                <p>Competência: <span>12 - 2023</span></p>
                                <p>Descrição: <span>Pagamento - Dezembro 2023</span></p>
                            </div>
                            <div class="box2">
                                <p>Data de vencimento: <span>05/12/2023</span></p>
                                <p>Tipo de pagamento: <span>Pagamento de funcionário</span></p>
                                <p>Tipo de Cálculo: <span>Por funcionário</span></p>
                            </div>
                        </div>
                        <table class="first-table">
                            <thead>
                                <tr>
                                    <th colspan="3" class="title">Proventos</th>
                                </tr>
                                <tr class="primary">
                                    <td>Descrição</td>
                                    <td>Referência</td>
                                    <td>Valor</td>
                                </tr>
                                <tr class="secondary">
                                    <td>Horas trabalhadas</td>
                                    <td class="valores">${176}</td>
                                    <td class="valores">${totalFerias}</td>
                                </tr>
                            </thead>
                        </table>
                        <table>
                            <thead>
                                <tr>
                                    <th colspan="3" class="title">Deduções</th>
                                </tr>
                                <tr class="primary">
                                    <td>Descrição</td>
                                    <td>Referência</td>
                                    <td>Valor</td>
                                </tr>
                                <tr class="secondary">
                                    <td>FGTS</td>
                                    <td class="valores">8%</td>
                                    <td class="valores">${fgts}</td>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <td id="total" colspan="3">Total <span>${liquidoferias}</span></td>
                                </tr>
                            </tfoot>
                        </table>
                        <div class="buttons">
                            <button class="button button-naoEnvia">Cancelar</button>                    
                            <button class="button button-enviar-holerite">Enviar</button>
                        </div>
                    `;
                    } else {
                        tabelasHTML = `
                        <div class="box-princ">
                            <div class="box1">
                                <p>Empresa: <span>Startup Language</span></p>
                                <p>Competência: <span>12 - 2023</span></p>
                                <p>Descrição: <span>Pagamento - Dezembro 2023</span></p>
                            </div>
                            <div class="box2">
                                <p>Data de vencimento: <span>05/12/2023</span></p>
                                <p>Tipo de pagamento: <span>Pagamento de funcionário</span></p>
                                <p>Tipo de Cálculo: <span>Por funcionário</span></p>
                            </div>
                        </div>
                        <table class="first-table">
                            <thead>
                                <tr>
                                    <th colspan="3" class="title">Proventos</th>
                                </tr>
                                <tr class="primary">
                                    <td>Descrição</td>
                                    <td>Referência</td>
                                    <td>Valor</td>
                                </tr>
                                <tr class="secondary">
                                    <td>Horas trabalhadas</td>
                                    <td class="valores">${encontrado.horasTotal}</td>
                                    <td class="valores">${total}</td>
                                </tr>
                            </thead>
                        </table>
                        <table>
                            <thead>
                                <tr>
                                    <th colspan="3" class="title">Deduções</th>
                                </tr>
                                <tr class="primary">
                                    <td>Descrição</td>
                                    <td>Referência</td>
                                    <td>Valor</td>
                                </tr>
                                <tr class="secondary">
                                    <td>VT</td>
                                    <td class="valores">6%</td>
                                    <td class="valores">${vt}</td>
                                </tr>
                                <tr class="secondary">
                                    <td>FGTS</td>
                                    <td class="valores">8%</td>
                                    <td class="valores">${fgts}</td>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <td id="total" colspan="3">Total <span>${liquido}</span></td>
                                </tr>
                            </tfoot>
                        </table>
                        <div class="buttons">
                            <button class="button button-naoEnvia">Cancelar</button>                    
                            <button class="button button-enviar-holerite">Enviar</button>
                        </div>
                    `;
                    }
                }
                corpoTabelas.innerHTML = tabelasHTML
                function tratarClique(e) {
                    if (e.target.classList.contains('button-enviar-holerite')) {
                        if (typeof encontrado.horasTotal !== 'number') {
                            alert('não é possivel enviar as informações, por gentileza, cadastre as horas do funcionário')
                        } else {
                            alert('holerite enviado')
                            corpoTabelas.innerHTML = ''
                            document.getElementById('holeriteIndividual').style.display = 'block';
                            document.querySelector('.main-page__content__holerite__opcao__umFuncionario__form').reset()
                        }
                    }
                    if (e.target.classList.contains('button-naoEnvia')) {
                        alert('holerite cancelado')
                        corpoTabelas.innerHTML = ''
                        document.getElementById('holeriteIndividual').style.display = 'block'
                        document.querySelector('.main-page__content__holerite__opcao__umFuncionario__form').reset()
                    }
                }

                corpoTabelas.addEventListener('click', tratarClique);
            });
        } else {
            alert('funcionário não encontrado');
        }

        const buttonCancelHolerite = document.querySelector('.btn-cancelar-holerite-umFunc')

        //botão cancelar na opção de um funcionario
        buttonCancelHolerite.addEventListener('click', () => {
            document.getElementById('holeriteIndividual').style.display = 'block'
            //removendo o formulario de um funcionario
            document.querySelector('.main-page__content__holerite__opcao__umFuncionario__form').style.display = 'none'
        })
    });

    //botão de cancelar holerite na opção de todos os funcionários
    document.querySelector('.btn-cancel-todosFunc').addEventListener('click', () => {
        document.querySelector('.main-page__content__holerite__opcao__todosFuncionarios').style.display = 'none'
        document.querySelector('.main-page__content__holerite').style.display = 'block'
    })

    document.querySelector('.main-page__content__holerite__opcao__todosFuncionarios__form').addEventListener('submit', (e) => {
        e.preventDefault()
        const holeriteTodosFunc = document.getElementById('tipos-holerite-todos')

        const confirmar = confirm(`Tem certeza que deseja gerar o holerite de todos os funcionarios ?`);

        if (confirmar) {
            let tabelas = ''
            tabelas = `
                <div class="box-princ box-princ--first">
                    <div class="box1">
                        <p>Empresa: <span>Startup Language</span></p>
                        <p>Competência: <span>12 - 2023</span></p>
                        <p>Descrição: <span>Pagamento - Dezembro 2023</span></p>
                    </div>
                    <div class="box2">
                        <p>Data de vencimento: <span>05/12/2023</span></p>
                        <p>Tipo de pagamento: <span>Pagamento de funcionário</span></p>
                        <p>Tipo de Cálculo: <span>Por funcionário</span></p>
                    </div>
                </div>
            `
            array.forEach(trabalhador => {
                trabalhador.horasTotal = 172
                const total = (trabalhador.salario * trabalhador.horasTotal).toFixed(2);
                const inss = parseFloat((total * 0.09).toFixed(2));
                const vt = parseFloat((total * 0.06).toFixed(2));
                const fgts = parseFloat((total * 0.08).toFixed(2));
                const liquido = (total - vt).toFixed(2);

                const total13 = (trabalhador.salario * 176).toFixed(2);
                const liquido13 = parseFloat(total13).toFixed(2);

                if (holeriteTodosFunc.value === 'pagamento') {
                    if ('ferias' in trabalhador) {
                        tabelas += `
                        <div class="funcIndividual">
                            <div class="box-princ">
                                <div class="box1">
                                    <p>Funcionário: <span>${trabalhador.nome}</span></p>
                                    <p>Tipo de Holerite: <span>Pagamento Férias</span></p>
                                </div>
                                <div class="box2">
                                    <p>Cargo: <span>${trabalhador.cargo}</span></p>
                                </div>
                            </div>
                            <table class="first-table">
                                <thead>
                                    <tr>
                                        <th colspan="3" class="title">Proventos</th>
                                    </tr>
                                    <tr class="primary">
                                        <td>Descrição</td>
                                        <td>Referência</td>
                                        <td>Valor</td>
                                    </tr>
                                    <tr class="secondary">
                                        <td>Horas trabalhadas</td>
                                        <td class="valores">${176}</td>
                                        <td class="valores">${total13}</td>
                                    </tr>
                                </thead>
                            </table>
                            <table>
                                <thead>
                                    <tr>
                                        <th colspan="3" class="title">Deduções</th>
                                    </tr>
                                    <tr class="primary">
                                        <td>Descrição</td>
                                        <td>Referência</td>
                                        <td>Valor</td>
                                    </tr>
                                    <tr class="secondary">
                                        <td>FGTS</td>
                                        <td class="valores">8%</td>
                                        <td class="valores">${fgts}</td>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <td id="total" colspan="3">Total <span>${liquido13}</span></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        `;
                    } else {
                        tabelas += `
                        <div class="funcIndividual">
                            <div class="box-princ">
                                <div class="box1">
                                    <p>Funcionário: <span>${trabalhador.nome}</span></p>
                                    <p>Tipo de Holerite: <span>Pagamento</span></p>
                                </div>
                                <div class="box2">
                                    <p>Cargo: <span>${trabalhador.cargo}</span></p>
                                </div>
                            </div>
                            <table class="first-table">
                                <thead>
                                    <tr>
                                        <th colspan="3" class="title">Proventos</th>
                                    </tr>
                                    <tr class="primary">
                                        <td>Descrição</td>
                                        <td>Referência</td>
                                        <td>Valor</td>
                                    </tr>
                                    <tr class="secondary">
                                        <td>Horas trabalhadas</td>
                                        <td class="valores">${trabalhador.horasTotal}</td>
                                        <td class="valores">${total}</td>
                                    </tr>
                                </thead>
                            </table>
                            <table>
                                <thead>
                                    <tr>
                                        <th colspan="3" class="title">Deduções</th>
                                    </tr>
                                    <tr class="primary">
                                        <td>Descrição</td>
                                        <td>Referência</td>
                                        <td>Valor</td>
                                    </tr>
                                    <tr class="secondary">
                                        <td>VT</td>
                                        <td class="valores">6%</td>
                                        <td class="valores">${vt}</td>
                                    </tr>
                                    <tr class="secondary">
                                        <td>FGTS</td>
                                        <td class="valores">8%</td>
                                        <td class="valores">${fgts}</td>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <td id="total" colspan="3">Total <span>${liquido}</span></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        `;
                    }

                } else {
                    tabelas += `
                        <div class="funcIndividual">
                            <div class="box-princ">
                                <div class="box1">
                                    <p>Funcionário: <span>${trabalhador.nome}</span></p>
                                </div>
                                <div class="box2">
                                    <p>Cargo: <span>${trabalhador.cargo}</span></p>
                                </div>
                            </div>
                            <table class="first-table">
                                <thead>
                                    <tr>
                                        <th colspan="3" class="title">Proventos</th>
                                    </tr>
                                    <tr class="primary">
                                        <td>Descrição</td>
                                        <td>Referência</td>
                                        <td>Valor</td>
                                    </tr>
                                    <tr class="secondary">
                                        <td>Horas trabalhadas</td>
                                        <td class="valores">${176}</td>
                                        <td class="valores">${total13}</td>
                                    </tr>
                                </thead>
                            </table>
                            <table>
                                <thead>
                                    <tr>
                                        <th colspan="3" class="title">Deduções</th>
                                    </tr>
                                    <tr class="primary">
                                        <td>Descrição</td>
                                        <td>Referência</td>
                                        <td>Valor</td>
                                    </tr>
                                    <tr class="secondary">
                                        <td>FGTS</td>
                                        <td class="valores">8%</td>
                                        <td class="valores">${fgts}</td>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <td id="total" colspan="3">Total <span>${liquido13}</span></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    `;
                }
            })
            tabelas += `
                <div class="buttons">
                    <button class="button button-cancelaHolerite-todos">Cancelar</button>                    
                    <button class="button button-enviar-holerite-todos">Enviar</button>
                </div>
            `

            const corpoTabelasTodosFunc = document.querySelector('.main-page__content__holerite__opcao__todosFuncionarios__tabelas');
            corpoTabelasTodosFunc.innerHTML = tabelas
            document.querySelector('.main-page__content__holerite__opcao__todosFuncionarios__form').style.display = 'none'

            corpoTabelasTodosFunc.addEventListener('click', (e) => {
                if (e.target.classList.contains('button-cancelaHolerite-todos')) {
                    corpoTabelasTodosFunc.innerHTML = ''
                    alert('operação cancelada')
                    document.querySelector('.main-page__content__holerite__opcao__todosFuncionarios__form').style.display = 'block'
                }
                if (e.target.classList.contains('button-enviar-holerite-todos')) {
                    const saoTodosNumeros = array.every(item => typeof item.horasTotal === 'number' && !isNaN(item.horasTotal));

                    if (!saoTodosNumeros) {
                        alert('não é possivel enviar as informações, por gentileza, cadastre as horas do funcionário')
                    } else {
                        alert('holerite enviado')
                        corpoTabelasTodosFunc.innerHTML = ''
                        alert('Holerites enviados')
                        document.querySelector('.main-page__content__holerite__opcao__todosFuncionarios__form').style.display = 'block'
                    }
                }
            })
        } else {
            alert('operação cancelada')
        }
    })
}