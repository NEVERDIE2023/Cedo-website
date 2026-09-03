// =====================================================
// SAMPOLO URBAN BEAUTY SALON — script.js
// Gère uniquement le formulaire de la page contact.html
// =====================================================

const formulaire = document.getElementById("formulaireRdv");

// Empêcher de choisir une date déjà passée
const champDate = document.getElementById("date");
if (champDate) {
    const aujourdHui = new Date().toISOString().split("T")[0];
    champDate.setAttribute("min", aujourdHui);
}

if (formulaire) {

    formulaire.addEventListener("submit", function (event) {

        // Empêcher le rechargement de la page
        event.preventDefault();

        // Récupérer les informations du formulaire
        const nom = document.getElementById("nom").value.trim();
        const telephone = document.getElementById("telephone").value.trim();
        const email = document.getElementById("email").value.trim();
        const service = document.getElementById("service").value;
        const date = document.getElementById("date").value;
        const heure = document.getElementById("heure").value;
        const message = document.getElementById("message").value.trim();

        // Construire l'objet rendez-vous
        const rendezVous = {
            nom: nom,
            telephone: telephone,
            email: email,
            service: service,
            date: date,
            heure: heure,
            message: message
        };

        // Sauvegarder localement (visible sur la page admin.html)
        let rendezVousList = JSON.parse(localStorage.getItem("rendezVous")) || [];
        rendezVousList.push(rendezVous);
        localStorage.setItem("rendezVous", JSON.stringify(rendezVousList));

        // Afficher un message de confirmation dans la page
        const messageConfirmation = document.getElementById("messageConfirmation");
        if (messageConfirmation) {
            messageConfirmation.classList.add("visible");
            messageConfirmation.scrollIntoView({ behavior: "smooth", block: "center" });
        }

        // Construire un message WhatsApp pré-rempli pour prévenir le salon en temps réel
        const texteWhatsApp =
            `Bonjour SAMPOLO, je souhaite prendre rendez-vous.%0A` +
            `Nom : ${nom}%0A` +
            `Téléphone : ${telephone}%0A` +
            `Service : ${service}%0A` +
            `Date : ${date}%0A` +
            `Heure : ${heure}` +
            (message ? `%0AMessage : ${message}` : "");

        const lienWhatsApp = `https://wa.me/25766005253text=${texteWhatsApp}`;

        // Ouvrir WhatsApp dans un nouvel onglet après un court délai
        setTimeout(function () {
            window.open(lienWhatsApp, "_blank");
        }, 600);

        // Vider le formulaire
        formulaire.reset();
        if (champDate) {
            champDate.setAttribute("min", new Date().toISOString().split("T")[0]);
        }
    });
}
