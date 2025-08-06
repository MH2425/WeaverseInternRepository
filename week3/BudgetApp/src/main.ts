import type { Transaction } from "./type";

let incomeTransactions : Transaction[] = [];
let expenseTransactions : Transaction[] = [];

const descriptionInput = document.getElementById('description') as HTMLInputElement;
const valueInput = document.getElementById('value') as HTMLInputElement;
const incomeBtn = document.getElementById('incomebtn') as HTMLButtonElement;
const expensesBtn = document.getElementById('expensesbtn') as HTMLButtonElement;
const incomeList = document.getElementById('incomelist') as HTMLUListElement;
const expensesList = document.getElementById('expenseslist') as HTMLUListElement;
const displayBalance = document.getElementById('display') as HTMLHeadingElement;
const speechBubble = document.getElementById('speech-bubble') as HTMLDivElement;
const speechText = document.getElementById('speech-text') as HTMLDivElement;

document.addEventListener('DOMContentLoaded', () => {
    incomeBtn.addEventListener('click', () => addTransaction(true));
    expensesBtn.addEventListener('click', () => addTransaction(false));
});

export function addTransaction(isIncome: boolean) {
    let description = descriptionInput.value.trim();
    let value = parseFloat(valueInput.value);

    if (isNaN(value) || value <= 0) {
        robotThrowError();
        return;
    }

    let transaction : Transaction = {
        value: value,
        description: description,
        isIncome: isIncome
    };

    if (isIncome) {
        incomeTransactions.push(transaction);
    } else {
        expenseTransactions.push(transaction);
    }

    descriptionInput.value = '';
    valueInput.value = '';
    update();
}

export function updateTransactionLists() {
    incomeList.innerHTML = '';
    expensesList.innerHTML = '';

    incomeTransactions.forEach((transaction) => {
        const incomeItem = createTransactionItem(transaction);
        incomeList.append(incomeItem);
    });

    expenseTransactions.forEach((transaction) => {
        const expenseItem = createTransactionItem(transaction);
        expensesList.append(expenseItem);
    });
}

export function createTransactionItem(transaction : Transaction) : HTMLLIElement {
    const listItem = document.createElement('li');
    listItem.className = 'flex justify-between items-center p-2 mb-2 mr-2 bg-gray-100 rounded-lg';
    listItem.innerHTML = `
        <div>
            <span class="font-medium">${transaction.description}</span>
        </div>
        <div class="flex items-center gap-5">
            <span class="${transaction.isIncome ? 'text-green-600' : 'text-red-600'} font-bold">
                ${transaction.isIncome ? '+' : '-'}$${transaction.value.toFixed(2)}
            </span>
        </div>
    `;
    return listItem;
}

export function updateBalance() {
    const income = incomeTransactions.reduce((sum, t) => sum + t.value, 0);
    const expenses = expenseTransactions.reduce((sum, t) => sum + t.value, 0);
    const balance = income - expenses;
    const balanceColor = balance >= 0 ? 'text-green-400' : 'text-red-400';
    displayBalance.innerHTML = `
        <div class="text-center">
            <div class="text-2xl">Balance</div>
            <div class="${balanceColor} text-4xl font-bold">$${balance.toFixed(2)}</div>
            <div class="text-lg mt-2">
                <span class="text-green-400">+$${income.toFixed(2)}</span> | 
                <span class="text-red-400">-$${expenses.toFixed(2)}</span>
            </div>
        </div>
    `;
    updateRobotSpeech(balance, income, expenses);
}

function updateRobotSpeech(balance: number, income: number, expenses: number) {
    let message = '';
    let bubbleColor = '';
    
    if (income === 0 && expenses === 0) {
        message = "Welcome!";
        bubbleColor = 'bg-blue-100 border-blue-300';
    } else if (balance > 0) {
        message = "You are rich! $.$";
        bubbleColor = 'bg-green-100 border-green-300';
    } else {
        message = "You are poor! T.T";
        bubbleColor = 'bg-red-100 border-red-300';
    }
    speechText.textContent = message;
    speechBubble.className = `absolute top-4 right-4 rounded-lg 
        p-3 shadow-lg max-w-xs transition-all duration-300 ${bubbleColor}`;
    speechBubble.style.opacity = '1';
    setTimeout(() => {
        speechBubble.style.opacity = '0';
    }, 3000);
}

function robotThrowError() {
    let message = 'Invalid input!';
    let bubbleColor = 'bg-red-100 border-red-300';
    speechText.textContent = message;
    speechBubble.className = `absolute top-4 right-4 rounded-lg 
        p-3 shadow-lg max-w-xs transition-all duration-300 ${bubbleColor}`;
    speechBubble.style.opacity = '1';
    setTimeout(() => {
        speechBubble.style.opacity = '0';
    }, 3000);
}

export function update() {
    updateTransactionLists();
    updateBalance();
}

update();





