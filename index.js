import './components/main-menu'
import './Data/get-data'

const root = document.getElementById("root");
function zeldaM() {
const mainMenu = document.createElement('main-menu');
const getData = document.createElement('get-data')
root.append(mainMenu, getData);
}
zeldaM()