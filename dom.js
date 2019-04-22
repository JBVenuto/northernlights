// DOM interactions
document.addEventListener('DOMContentLoaded', function () {
    // Event listener for user change of Kp
    document.getElementById("kpBtn").addEventListener('click', aurora.setKp);

    // Map modals
    const naModal = document.getElementById("naModal");
    const eaModal = document.getElementById("eaModal");
    // Buttons to trigger modals
    const naBtn = document.getElementById("naMap");
    const eaBtn = document.getElementById("eaMap");
    const naClose = document.getElementById("naClose");
    const eaClose = document.getElementById("eaClose");

    // Open North American map modal
    naBtn.onclick = function () {
        naModal.style.display = "block";
    }
    // Open Eurasia map modal
    eaBtn.onclick = function () {
        eaModal.style.display = "block";
    }

    // Close the modal
    naClose.onclick = function () {
        naModal.style.display = "none";
    }
    eaClose.onclick = function () {
        eaModal.style.display = "none";
    }
    window.onclick = function () {
        if (event.target == naModal) {
            naModal.style.display = "none";
        }
        if (event.target == eaModal) {
            eaModal.style.display = "none";
        }
    }
})