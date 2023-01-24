
function getValues() {
    //get input values
    let loanAmount = document.getElementById('loanAmount').value;
    let termLength = document.getElementById('termLength').value;
    let interestRate = document.getElementById('interestRate').value;

    //make sure inputs are numbers
    if (Number.isNaN(loanAmount) || Number.isNaN(termLength) || Number.isNaN(interestRate)) {

        Swal.fire(
            {
                icon: 'error',
                title: 'Oops!',
                text: 'Only positive integers are allowed!'
            }
        );

        //Sends input values to calculate and display functions
    } else {
        let info = calculateMortgage(loanAmount, termLength, interestRate);
        displayInfo(info, termLength);
    }
}

//parameters on this function are called from getValues function, user input.
function calculateMortgage(amount, term, rate) {
    //monthly payment calculated using the numbers from the getValues function

    rate = rate / 1200;

    let monthlyPayment = (amount * (rate)) / (1 - Math.pow((1 + rate), -term));


    let tableInfo = [];

    let totalInterest = 0;
    let totalPrincipal = 0;
    let balance = amount;

    for (let index = 1; index <= term; index++) {

        balance = balance;
        let month = index;
        let payment = monthlyPayment;
        let interest = balance * rate;
        let principal = payment - interest;
        balance -= principal;
        totalInterest += interest;
        totalPrincipal += principal;

        let tableRow = {
            month: month,
            payment: payment,
            principal: principal,
            interest: interest,
            totalInterest: totalInterest,
            balance: Math.abs(balance),
            monthlyPayment: monthlyPayment,
            totalPrincipal: totalPrincipal
        };

        tableInfo.push(tableRow);
    }
    return tableInfo;
}

function displayInfo(info, termLength) {
    let paymentAmount = document.getElementById('paymentAmount');
    let totalPrincipal = document.getElementById('totalPrincipal');
    let totalInterest = document.getElementById('totalInterest');
    let totalCost = document.getElementById('totalCost');
    let tableBody = document.getElementById('mortgageTable');

    const loanTableTemplate = document.getElementById('loanTableTemplate');

    tableBody.innerHTML = '';

    for (let index = 0; index < termLength; index++) {

        let appRow = document.importNode(loanTableTemplate.content, true);

        let tableCells = appRow.querySelectorAll('td');

        tableCells[0].textContent = info[index].month;
        tableCells[1].textContent = info[index].payment.toLocaleString("en-US", { style: "currency", currency: "USD" });
        tableCells[2].textContent = info[index].principal.toLocaleString("en-US", { style: "currency", currency: "USD" });
        tableCells[3].textContent = info[index].interest.toLocaleString("en-US", { style: "currency", currency: "USD" });
        tableCells[4].textContent = info[index].totalInterest.toLocaleString("en-US", { style: "currency", currency: "USD" });
        tableCells[5].textContent = info[index].balance.toLocaleString("en-US", { style: "currency", currency: "USD" });

        tableBody.appendChild(appRow);

    }

    paymentAmount.textContent = info[0].payment.toLocaleString("en-US", { style: "currency", currency: "USD" });
    totalPrincipal.textContent = info[termLength - 1].totalPrincipal.toLocaleString("en-US", { style: "currency", currency: "USD" });
    totalInterest.textContent = info[termLength - 1].totalInterest.toLocaleString("en-US", { style: "currency", currency: "USD" });
    totalCost.textContent = (info[termLength - 1].totalPrincipal + info[termLength - 1].totalInterest).toLocaleString("en-US", { style: "currency", currency: "USD" });

}