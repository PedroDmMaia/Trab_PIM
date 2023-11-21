const Trabalhadores = []

class Funcionario {
    constructor(nomeFuncionario, contaBancaria, CPF, email, genero, dataNasc, Cargo, Salario) {
        this.nome = nomeFuncionario.toLowerCase()
        this.contaBancaria = contaBancaria
        this.cpf = CPF
        this.email = email
        this.genero = genero
        this.dataNasc = dataNasc
        this.cargo = Cargo
        this.salario = Salario
    }
}

class Professor extends Funcionario {
    constructor(nomeFuncionario, contaBancaria, CPF, email, genero, dataNasc) {
        super(nomeFuncionario, contaBancaria, CPF, email, genero, dataNasc, 'Professor', 16.03)
    }
}

class Secrataria extends Funcionario {
    constructor(nomeFuncionario, contaBancaria, CPF, email, genero, dataNasc) {
        super(nomeFuncionario, contaBancaria, CPF, email, genero, dataNasc, 'Secretária', 14.07)
    }
}

class RH extends Funcionario {
    constructor(nomeFuncionario, contaBancaria, CPF, email, genero, dataNasc) {
        super(nomeFuncionario, contaBancaria, CPF, email, genero, dataNasc, 'RH', 25.41)
    }
}

class TI extends Funcionario {
    constructor(nomeFuncionario, contaBancaria, CPF, email, genero, dataNasc) {
        super(nomeFuncionario, contaBancaria, CPF, email, genero, dataNasc, 'TI', 31.85)
    }
}

const Professor1 = new Professor('Teadoro Campos', 13072533, 26895242015, 'teodoro@hotmail.com', 'masculino', '1985-10-11')
const Professor2 = new Professor('Fernando Campos', 2991004, 83126313990, 'fernando@hotmail.com', 'masculino', '1990-03-13')
const Professor3 = new Professor('Hugo Rodrigues', 270821142, 78089575269, 'hugo@hotmail.com', 'masculino', '1988-01-12')
const Professor4 = new Professor('Júlia Henriques', 11392148, 50666911703, 'julia@hotmail.com', 'feminino', '1977-03-10')

const Secrataria1 = new Secrataria('Marli Benzerra', 10277684, 67992512464, 'marli@hotmail.com', 'feminino', '1995-07-15')

const Rh1 = new RH('Bárbara Catilho', 2634058, 94973111171, 'barbara@hotmail.com', 'feminino', '2003-08-06')
const Rh2 = new RH('Marcelo Carvalho', 16525758, 64132885828, 'marcelo@hotmail.com', 'masculino', '1979-02-16')

const TI1 = new TI('Saulo Borges', 152906431, 46401993928, 'saulo@hotmail.com', 'masculino', '1984-06-04')

Trabalhadores.push(Professor1, Professor2, Professor3, Professor4, Secrataria1, Rh1, Rh2, TI1)

export { Trabalhadores, Professor, Secrataria, RH, TI }