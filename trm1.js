
function calcola_codice_generale() {
    const cognome_uncoded = document.getElementById("cognome").value.trim().toUpperCase();
    const nome_uncoded = document.getElementById("nome").value.trim().toUpperCase();
    const data_uncoded = document.getElementById("data").value;
    const sesso_uncoded = document.getElementById("sesso").value;
    const Comune_encoded = document.getElementById("comune_codice").value;

    const Cognome_enncoded = calcolaCognome(cognome_uncoded);
    const Nome_encoded = calcolaNome(nome_uncoded);
    const Data_Sesso_encoded = calcolaDataESesso(data_uncoded, sesso_uncoded);

    let code_finished = Cognome_enncoded + Nome_encoded + Data_Sesso_encoded + Comune_encoded;
    code_finished += genera_check_digit(code_finished)
    document.getElementById("risultato").innerHTML = code_finished;
}

function calcolaCognome(cognome) {
    const consonanti = cognome
        .split("")
        .filter((char) => define_Consonante(char.charCodeAt(0)));
    const vocali = cognome
        .split("")
        .filter((char) => define_Vocale(char.charCodeAt(0)));

    let codice = (consonanti.join("") + vocali.join("")).substring(0, 3);

    while (codice.length < 3) {
        codice += "X";
    }
    return codice;
}

function calcolaNome(nome) {
    const consonanti = nome
        .split("")
        .filter((char) => define_Consonante(char.charCodeAt(0)));
    const vocali = nome
        .split("")
        .filter((char) => define_Vocale(char.charCodeAt(0)));

    let codice = consonanti.join("");
    if (consonanti.length >= 4) {
        codice = consonanti[0] + consonanti[2] + consonanti[3];
    } else {
        codice += vocali.join("");
    }

    codice = codice.substring(0, 3);
    while (codice.length < 3) {
        codice += "X";
    }
    return codice;
}

function calcolaDataESesso(data, sesso) {
    const mesi = "ABCDEHLMPRST";
    const [anno, mese, giorno] = data.split("-");

    const annoCodice = anno.substring(2);
    const meseCodice = mesi[parseInt(mese, 10) - 1];
    let giornoCodice = parseInt(giorno, 10);

    if (sesso === "F") {
        giornoCodice += 40;
    }

    return annoCodice + meseCodice + String(giornoCodice).padStart(2, "0");
}

function define_Consonante(asciiCode) {
    return (
        (asciiCode >= 65 && asciiCode <= 90) &&
        !define_Vocale(asciiCode)
    );
}

function define_Vocale(asciiCode) {
    return (
        asciiCode === 65 ||
        asciiCode === 69 ||
        asciiCode === 73 ||
        asciiCode === 79 ||
        asciiCode === 85
    );
}

function genera_codice_comuni(input) {
    let testo = "";
    let inputfile = input.files[0];   //input.files è un array per


    if (inputfile) {
        let reader = new FileReader();

        reader.readAsText(inputfile);       //inputfile è l'oggetto da leggere come testo

        reader.onload = function () {   //al termine del caricamento viene generato l'evento load
            testo = reader.result;   //prop. result di target dell'oggetto "e" mi consente di accedere al contenuto del file

            let selezione_comune = document.createElement("select")
            testo.split("\r\n").forEach(Elemento => {
                let punto = document.createElement("option")
                punto.innerText = Elemento.split(";")[0];
                punto.value = Elemento.split(";")[1];
                selezione_comune.appendChild(punto);
            });
            selezione_comune.id = "comune_codice"
            document.getElementById("comuni").appendChild(selezione_comune);
        }
    }
}

function genera_check_digit(codice_senza_checkdigit) {
    const array_lettere_pari = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
    const array_lettere_dispari = [1, 0, 5, 7, 9, 13, 15, 17, 19, 21, 2, 4, 18, 20, 11, 3, 6, 8, 12, 14, 16, 10, 22, 25, 24, 23]
    const array_lettere_finale = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    let somma = 0;
    let check_digit = "";
    for (let i = 0; i < 15; i++) {
        if (i % 2 == 0) {
    console.log( codice_senza_checkdigit.indexOf[i]);
    alert
        } else {
            somma += array_lettere_dispari[array_lettere_finale.indexOf(codice_senza_checkdigit[i])]
        }
    }
    somma = somma % 26
    check_digit = array_lettere_finale[array_lettere_pari.indexOf(somma)];
    alert(somma);
    return (check_digit);
}