document.addEventListener("DOMContentLoaded", function () {
    const app = document.getElementById("app");

    function loadPage(page) {
        switch (page) {
            case "first":
                app.innerHTML = `
                    <div class="container">
                        <h1>You have 5 seconds, click the button that speaks to you the most!</h1>
                        <button id="begin">Begin</button>
                    </div>
                `;
                document.getElementById("begin").addEventListener("click", () => loadPage("second"));
                break;

            case "second":
                app.innerHTML = `
                    <div class="container">
                        <div id="button-container">
                            <button class="button red-rounded" data-description="Bright Red Rounded">Click me!</button>
                            <button class="button pastel-pink-square" data-description="Pastel Pink Squared">Click me!</button>
                            <button class="button neon-blue-square" data-description="Neon Blue Squared">Click me!</button>
                            <button class="button white-rounded" data-description="White Rounded">Click me!</button>
                            <button class="button pastel-blue-rounded" data-description="Pastel Blue Rounded">Click me!</button>
                            <button class="button red-square" data-description="Bright Red Squared">Click me!</button>
                            <button class="button white-square" data-description="White Squared">Click me!</button>
                            <button class="button neon-blue-rounded" data-description="Neon Blue Rounded">Click me!</button>
                            <button class="button pastel-pink-rounded" data-description="Pastel Pink Rounded">Click me!</button>
                            <button class="button pastel-blue-square" data-description="Pastel Blue Squared">Click me!</button>
                        </div>
                    </div>
                `;

                let selectedOption = "No selection";
                let timeout = setTimeout(() => {
                    sessionStorage.setItem("selection", selectedOption);
                    loadPage("third");
                }, 5000);

                document.querySelectorAll("#button-container .button").forEach(button => {
                    button.addEventListener("click", function () {
                        selectedOption = this.getAttribute("data-description");
                        sessionStorage.setItem("selection", selectedOption);
                        clearTimeout(timeout);
                        loadPage("third");
                    });
                });
                break;

            case "third":
                const userSelection = sessionStorage.getItem("selection") || "No selection";
                app.innerHTML = `
                    <div class="container">
                        <h1>You got ${userSelection}</h1>
                        <p>Please select this option on our survey, thank you!</p>
                        <button id="try-again">Try Again</button>
                    </div>
                `;
                document.getElementById("try-again").addEventListener("click", () => loadPage("first"));
                break;
        }
    }

    loadPage("first");
});