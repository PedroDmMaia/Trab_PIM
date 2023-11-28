import { Trabalhadores, Professor, Secrataria, RH, TI } from "./funcionarios"

document.addEventListener("DOMContentLoaded", () => {
    const buttonEntrar = document.querySelector('form')
    const homePage = document.querySelector('.home-page')

    buttonEntrar.addEventListener('submit', function (e) {
        e.preventDefault()
        homePage.style.display = 'none';
    })

    TrocaConteudo()
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

            //mostra somente o conteudo referente ao indice
            contents[indice].style.display = 'flex';
        });
    });
}

function FuncionariosCad() {
    const inputs = document.querySelectorAll('.main-page__content__opcoes__cadastrar__form__input > input')
    const form = document.querySelector('.main-page__content__opcoes__cadastrar__form')
    const opcao = document.getElementById('profissoes')
    const buttonCancelar = document.querySelectorAll('.cancelar')

    let novoFuncionario = ''

    form.addEventListener('submit', () => {

        if (opcao.value === 'professor') {
            novoFuncionario = new Professor(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value, inputs[5].value)
            Trabalhadores.push(novoFuncionario)
        }

        if (opcao.value === 'Rh') {
            novoFuncionario = new RH(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value, inputs[5].value)
            Trabalhadores.push(novoFuncionario)
        }

        if (opcao.value === 'Ti') {
            novoFuncionario = new TI(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value, inputs[5].value)
            Trabalhadores.push(novoFuncionario)
        }

        if (opcao.value === 'secretaria') {
            novoFuncionario = new Secrataria(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value, inputs[5].value)
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

                const label = document.createElement('label');
                label.textContent = prop;
                label.setAttribute('for', prop);

                let input;

                if (prop === 'cargo') {
                    input = document.createElement('select');
                    input.id = prop;
                    const options = ['Professor(a)', 'RH', 'TI', 'Secretaria(o)'];
                    options.forEach(optionText => {
                        const option = document.createElement('option');
                        option.value = optionText.toLowerCase();
                        option.textContent = optionText;
                        input.appendChild(option);
                    });
                    input.value = funcionarioEncontrado[prop].toLowerCase();
                } else {
                    input = document.createElement('input');
                    input.id = prop;
                    input.name = prop;
                    input.value = funcionarioEncontrado[prop];
                }

                divInputGroup.appendChild(label);
                divInputGroup.appendChild(input);

                form.appendChild(divInputGroup);
            }

            const divButtons = document.createElement('div')
            divButtons.classList.add('buttons-form')

            const submitButton = document.createElement('button');
            submitButton.type = 'submit';
            submitButton.classList.add('button')
            submitButton.textContent = 'Salvar';
            divButtons.appendChild(submitButton);

            const cancelButton = document.createElement('button');
            cancelButton.type = 'click';
            cancelButton.classList.add('button')
            cancelButton.textContent = 'cancelar';
            divButtons.appendChild(cancelButton);

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
                    // horasTrab.value = 150
                } else {
                    horasTrab.disabled = false; // Habilita o campo de horas trabalhadas
                }
            });
            const corpoTabelas = document.querySelector('.main-page__content__holerite__opcao__umFuncionario__content__tabelas');

            document.querySelector('.main-page__content__holerite__opcao__umFuncionario__form').addEventListener('submit', () => {
                // const horasTrab = document.getElementById('horasTrab');
                let total = (encontrado.salario * horasTrab.value).toFixed(2)
                let inss = parseFloat((total * 0.09).toFixed(2))
                let vt = parseFloat((total * 0.06).toFixed(2))
                let fgts = parseFloat((total * 0.08).toFixed(2))
                let liquido = (((total - inss) - vt) - fgts).toFixed(2)

                //selecionando o funcionario
                document.querySelector('.main-page__content__holerite__opcao__umFuncionario__form').style.display = 'none'
                document.querySelector('.main-page__content__holerite__opcao__umFuncionario > .main-page__header').style.display = 'none'

                let tabelasHTML = `
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
                                <td class="valores">${horasTrab.value}</td>
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
                                <td>INSS</td>   
                                <td class="valores">9%</td>
                                <td class="valores">${inss}</td>
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
                corpoTabelas.innerHTML = tabelasHTML
            });
            function tratarClique(e) {
                if (e.target.classList.contains('button-enviar-holerite')) {
                    alert('holerite enviado')
                    corpoTabelas.innerHTML = ''
                    document.getElementById('holeriteIndividual').style.display = 'block';
                    document.querySelector('.main-page__content__holerite__opcao__umFuncionario__form').reset()
                }
                if (e.target.classList.contains('button-naoEnvia')) {
                    alert('holerite cancelado')
                    corpoTabelas.innerHTML = ''
                    document.getElementById('holeriteIndividual').style.display = 'block'
                    document.querySelector('.main-page__content__holerite__opcao__umFuncionario__form').reset()
                }
            }

            // Adicionar o event listener ao elemento desejado com a opção once
            corpoTabelas.addEventListener('click', tratarClique);
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

    document.querySelector('.main-page__content__holerite__opcao__todosFuncionarios__form').addEventListener('submit', () => {
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
                const total = (trabalhador.salario * 150).toFixed(2);
                const inss = parseFloat((total * 0.09).toFixed(2));
                const vt = parseFloat((total * 0.06).toFixed(2));
                const fgts = parseFloat((total * 0.08).toFixed(2));
                const liquido = (((total - inss) - vt) - fgts).toFixed(2);

                const liquido13 = ((total - inss) - fgts).toFixed(2);

                if (holeriteTodosFunc.value === 'pagamento') {
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
                                        <td class="valores">${150}</td>
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
                                        <td>INSS</td>   
                                        <td class="valores">9%</td>
                                        <td class="valores">${inss}</td>
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
                                        <td class="valores">${150}</td>
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
                                        <td>INSS</td>   
                                        <td class="valores">9%</td>
                                        <td class="valores">${inss}</td>
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
                    corpoTabelasTodosFunc.innerHTML = ''
                    alert('Holerites enviados')
                    document.querySelector('.main-page__content__holerite__opcao__todosFuncionarios__form').style.display = 'block'
                }
            })

        } else {
            alert('operação cancelada')
        }
    })
}

