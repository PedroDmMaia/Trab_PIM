const Trabalhadores = []

class Funcionario {
    constructor(nomeFuncionario, email, dataNasc, Cargo, Salario) {
        this.nome = nomeFuncionario.toLowerCase()
        this.email = email
        this.dataNasc = dataNasc
        this.cargo = Cargo
        this.salario = Salario
    }
}

class Professor extends Funcionario {
    constructor(nomeFuncionario, email, dataNasc) {
        super(nomeFuncionario, email, dataNasc, 'Professor', 16.03)
    }
}

class Secrataria extends Funcionario {
    constructor(nomeFuncionario, email, dataNasc) {
        super(nomeFuncionario, email, dataNasc, 'Secretária', 14.07)
    }
}

class RH extends Funcionario {
    constructor(nomeFuncionario, email, dataNasc) {
        super(nomeFuncionario, email, dataNasc, 'RH', 25.41)
    }
}

class TI extends Funcionario {
    constructor(nomeFuncionario, email, dataNasc) {
        super(nomeFuncionario, email, dataNasc, 'TI', 31.85)
    }
}

const Professor1 = new Professor('Teadoro Campos', 'teodoro@sl.com', '1985-10-11')
const Professor2 = new Professor('Fernando Campos', 'fernando@sl.com', '1990-03-13')
const Professor3 = new Professor('Hugo Rodrigues', 'hugo@sl.com', '1988-01-12')
const Professor4 = new Professor('Júlia Henriques', 'julia@sj.com', '1977-03-10')

const Secrataria1 = new Secrataria('Marli Benzerra', 'marli@sl.com', '1995-07-15')

const Rh1 = new RH('Bárbara Catilho', 'barbara@sl.com', '2003-08-06')
const Rh2 = new RH('Marcelo Carvalho', 'marcelo@sl.com', '1979-02-16')

const TI1 = new TI('Saulo Borges', 'saulo@sl.com', '1984-06-04')

Trabalhadores.push(Professor1, Professor2, Professor3, Professor4, Secrataria1, Rh1, Rh2, TI1)

export { Trabalhadores, Professor, Secrataria, RH, TI }