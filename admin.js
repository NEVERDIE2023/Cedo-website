// =====================================================
// SAMPOLO URBAN BEAUTY SALON — admin.js
// Tableau de bord : lit les rendez-vous stockés dans localStorage
// =====================================================

function chargerRendezVous() {

    let rendezVous = JSON.parse(localStorage.getItem("rendezVous")) || [];

    // Trier du rendez-vous le plus proche au plus lointain
    rendezVous.sort(function (a, b) {
        return (a.date + " " + a.heure).localeCompare(b.date + " " + b.heure);
    });

    const liste = document.getElementById("listeRendezVous");
    const compteur = document.getElementById("nombreRendezVous");

    // Corrige le compteur qui restait bloqué à 0
    compteur.textContent = rendezVous.length;

    liste.innerHTML = "";

    if (rendezVous.length === 0) {
        liste.innerHTML = "<p>📭 Aucun rendez-vous enregistré.</p>";
        return;
    }

    rendezVous.forEach(function (rdv, index) {

        const carte = document.createElement("div");
        carte.className = "carte rdv";

        carte.innerHTML = `
            <h3>👤 ${rdv.nom}</h3>
            <p>📞 Téléphone : ${rdv.telephone}</p>
            <p>📧 Email : ${rdv.email || "—"}</p>
            <p>💅 Service : ${rdv.service}</p>
            <p>📅 Date : ${rdv.date}</p>
            <p>⏰ Heure : ${rdv.heure}</p>
            ${rdv.message ? `<p>📝 Message : ${rdv.message}</p>` : ""}
            <button data-index="${index}" class="btnSupprimer">🗑️ Supprimer</button>
        `;

        liste.appendChild(carte);
    });

    // Un seul écouteur sur les boutons "Supprimer" (plus fiable qu'un onclick inline)
    liste.querySelectorAll(".btnSupprimer").forEach(function (bouton) {
        bouton.addEventListener("click", function () {
            supprimer(Number(bouton.dataset.index));
        });
    });
}

function supprimer(index) {
    let rendezVous = JSON.parse(localStorage.getItem("rendezVous")) || [];

    rendezVous.sort(function (a, b) {
        return (a.date + " " + a.heure).localeCompare(b.date + " " + b.heure);
    });

    rendezVous.splice(index, 1);
    localStorage.setItem("rendezVous", JSON.stringify(rendezVous));
    chargerRendezVous();
}

document.getElementById("btnEffacerTout").addEventListener("click", function () {
    if (confirm("Effacer tous les rendez-vous enregistrés ?")) {
        localStorage.removeItem("rendezVous");
        chargerRendezVous();
    }
});

chargerRendezVous();
