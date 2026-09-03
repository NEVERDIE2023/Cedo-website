// =====================================================
// SAMPOLO URBAN BEAUTY SALON — admin.js
// =====================================================

function afficherRendezVous() {
    const liste = document.getElementById("listeRendezVous");
    const compteur = document.getElementById("nombreRendezVous");

    let rendezVousList = JSON.parse(localStorage.getItem("rendezVous")) || [];

    // Mettre à jour le nombre
    if (compteur) {
        compteur.textContent = rendezVousList.length;
    }

    // Si aucun rendez-vous
    if (rendezVousList.length === 0) {
        liste.innerHTML = `<p>📭 Aucun rendez-vous enregistré.</p>`;
        return;
    }

    // Afficher la liste
    liste.innerHTML = "";

    rendezVousList.forEach((rdv, index) => {
        const carte = document.createElement("div");
        carte.className = "carte";
        carte.style.marginBottom = "20px";

        carte.innerHTML = `
            <h3>👤 ${rdv.nom}</h3>
            <p><strong>Téléphone :</strong> ${rdv.telephone}</p>
            <p><strong>Email :</strong> ${rdv.email || "Non renseigné"}</p>
            <p><strong>Service :</strong> ${rdv.service}</p>
            <p><strong>Date :</strong> ${rdv.date}</p>
            <p><strong>Heure :</strong> ${rdv.heure}</p>
            <p><strong>Message :</strong> ${rdv.message || "Aucun"}</p>
            <p style="font-size: 0.85em; color: #888;">
                Enregistré le : ${rdv.dateEnregistrement || "—"}
            </p>
            <button class="bouton" onclick="supprimerRendezVous(${index})" style="margin-top: 10px; background: #e74c3c;">
                🗑️ Supprimer
            </button>
        `;

        liste.appendChild(carte);
    });
}

// Supprimer un seul rendez-vous
function supprimerRendezVous(index) {
    let rendezVousList = JSON.parse(localStorage.getItem("rendezVous")) || [];
    rendezVousList.splice(index, 1);
    localStorage.setItem("rendezVous", JSON.stringify(rendezVousList));
    afficherRendezVous();
}

// Tout effacer
const btnEffacer = document.getElementById("btnEffacerTout");
if (btnEffacer) {
    btnEffacer.addEventListener("click", function () {
        if (confirm("Voulez-vous vraiment tout effacer ?")) {
            localStorage.removeItem("rendezVous");
            afficherRendezVous();
        }
    });
}

// Afficher dès que la page charge
afficherRendezVous();