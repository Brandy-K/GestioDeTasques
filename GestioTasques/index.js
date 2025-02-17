class Tasca {
    static totalTasques = 0;
    static tasques = [];

    constructor(id, nom, completada, prioritat, tipus) {
        this.#id = id;
        this.#nom = nom;
        this.#completada = completada;
        this.prioritat = prioritat;
        this.tipus = tipus;
        Tasca.totalTasques++;
        Tasca.tasques.push(this);
    }

    #id;
    #nom;
    #completada;

    get id() {
        return this.#id;
    }

    set id(newId) {
        this.#id = newId;
    }

    get nom() {
        return this.#nom;
    }

    set nom(newNom) {
        this.#nom = newNom;
    }

    completar() {
        this.#completada = true;
    }

    estaCompletada() {
        return this.#completada;
    }

    mostrarInfoTasca() {
        return `${this.nom}, Tipus: ${this.tipus}, Prioritat: ${this.prioritat}, Completada: ${this.#completada}`;
    }
}

class Critica extends Tasca {
    #dataLimit;
    #descripcio;

    constructor(id, nom, completada, prioritat, tipus, dataLimit, descripcio) {
        super(id, nom, completada, prioritat, tipus);
        this.#dataLimit = dataLimit;
        this.#descripcio = descripcio;
    }

    get dataLimit() {
        return this.#dataLimit;
    }

    set dataLimit(newdataLimit) {
        this.#dataLimit = newdataLimit;
    }

    mostrarInfoTasca() {
        return `DataLimit: ${this.#dataLimit}, Descripcio: ${this.#descripcio}, ${this.nom}, Tipus: ${this.tipus}, Prioritat: ${this.prioritat}, Completada: ${this.estaCompletada()}`;
    }
}

class Urgent extends Tasca {
    #recordatori;

    constructor(id, nom, completada, prioritat, tipus, recordatori) {
        super(id, nom, completada, prioritat, tipus);
        this.#recordatori = recordatori;
    }

    mostrarInfoTasca() {
        return `Recordatori: ${this.#recordatori}, ${this.nom}, Tipus: ${this.tipus}, Prioritat: ${this.prioritat}, Completada: ${this.estaCompletada()}`;
    }
}

class App {
    constructor() {
        this.tasques = [];
    }

    afegirTasca(tipus, id, nom, completada, prioritat, extra) {
        let tasca;
        if (tipus === 'normal') {
            tasca = new Tasca(id, nom, completada, prioritat, tipus);
        } else if (tipus === 'urgent') {
            tasca = new Urgent(id, nom, completada, prioritat, tipus, extra);
        } else if (tipus === 'critica') {
            tasca = new Critica(id, nom, completada, prioritat, tipus, extra.dataLimit, extra.descripcio);
        }
        this.tasques.push(tasca);
    }

    completarTasca(id) {
        const tasca = this.tasques.find(t => t.id === id);
        if (tasca && !tasca.estaCompletada()) {
            tasca.completar();
        }
    }

    eliminarTasca(id) {
        this.tasques = this.tasques.filter(t => t.id !== id);
    }

    modificarTasca(id, newNom) {
        const tasca = this.tasques.find(t => t.id === id);
        if (tasca) {
            tasca.nom = newNom;
        }
    }

    actualitzarLlista() {
        this.tasques.forEach(tasca => {
            console.log(tasca.mostrarInfoTasca());
        });
    }

    mostrarTotalTasques() {
        console.log(this.tasques.length);
    }
}

// Test code
const app = new App();

console.log("Inicialitzar APP");
app.actualitzarLlista();
app.mostrarTotalTasques();

console.log("Afegir 4 tasques: 2 normals amb diferent prioritat, 2 urgents i 1 crítica.");
app.afegirTasca('normal', 1, 'Tasca Normal 1', false, 'baixa', {});
app.afegirTasca('normal', 2, 'Tasca Normal 2', false, 'alta', {});
app.afegirTasca('urgent', 3, 'Tasca Urgent 1', false, 'alta', 'Recordatori 1');
app.afegirTasca('urgent', 4, 'Tasca Urgent 2', false, 'baixa', 'Recordatori 2');
app.afegirTasca('critica', 5, 'Tasca Crítica 1', false, 'alta', { dataLimit: '2023-12-31', descripcio: 'Descripció Crítica' });

app.actualitzarLlista();
app.mostrarTotalTasques();

console.log("Modificar una de les tasques.");
app.modificarTasca(1, 'Tasca Normal 1 Modificada');

console.log("Completar dos de les tasques.");
app.completarTasca(2);
app.completarTasca(3);

console.log("Afegir 1 tasca nova.");
app.afegirTasca('normal', 6, 'Tasca Normal 3', false, 'mitjana', {});

app.actualitzarLlista();
app.mostrarTotalTasques();

console.log("Eliminar dos tasques.");
app.eliminarTasca(4);
app.eliminarTasca(5);

app.actualitzarLlista();
app.mostrarTotalTasques();