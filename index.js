console.log("Задача про управління записами книг");
// Ви працюєте розробником у книжковому магазині і вам потрібно створити систему для ефективного управління запасами на складі. Вам надається
//  масив об'єктів bookEntries, кожен з яких представляє запис про партію книг, що надійшла або була продана.
//Кожен запис bookEntry має таку структуру:
//// Приклад вхідних даних:
//const bookEntries = [
  //{ bookId: 'B001', title: 'The Great Adventure', author: 'A. Author', price: 20.00, change: 10, timestamp: new Date('2024-01-01T10:00:00Z') },
  //{ bookId: 'B002', title: 'Mysteries of JS', author: 'B. Coder', price: 25.00, change: 5, timestamp: new Date('2024-01-01T10:05:00Z') },
  //{ bookId: 'B001', title: 'The Great Adventure', author: 'A. Author', price: 20.00, change: -3, timestamp: new Date('2024-01-02T11:00:00Z') }, // Продано 3
  //{ bookId: 'B003', title: 'Data Structures 101', author: 'C. Algo', price: 30.00, change: 8, timestamp: new Date('2024-01-03T09:00:00Z') },
  //{ bookId: 'B002', title: 'Mysteries of JS', author: 'B. Coder', price: 25.00, change: -2, timestamp: new Date('2024-01-04T14:30:00Z') }, // Продано 2
  //{ bookId: 'B001', title: 'The Great Adventure', author: 'A. Author', price: 22.00, change: -5, timestamp: new Date('2024-01-05T16:00:00Z') }, // Продано 5 (зміна ціни)
  //{ bookId: 'B004', title: 'Clean Code Basics', author: 'D. Best', price: 18.00, change: 12, timestamp: new Date('2024-01-06T10:00:00Z') },
  //{ bookId: 'B003', title: 'Data Structures 101', author: 'C. Algo', price: 30.00, change: -1, timestamp: new Date('2024-01-07T11:00:00Z') }, // Продано 1
  //{ bookId: 'B002', title: 'Mysteries of JS', author: 'B. Coder', price: 25.00, change: -1, timestamp: new Date('2024-01-08T12:00:00Z') }, // Продано 1
 // { bookId: 'B005', title: 'Web Development Guide', author: 'E. Dev', price: 35.00, change: 0, timestamp: new Date('2024-01-09T09:00:00Z') } // Нульова зміна
//];
// Очікуваний результат:
// {
//     currentStock: {
//       'B001': 2,   // 10 - 3 - 5 = 2
//       'B002': 2,   // 5 - 2 - 1 = 2
//       'B003': 7,   // 8 - 1 = 7
//       'B004': 12,  // 12
//       'B005': 0    // 0 (якщо була зміна на 0, але її не було в попередньому запасі, її може і не бути, або 0)
//                    // За логікою, якщо книга мала change=0, вона не впливає на запас, і якщо її немає в інших записах, вона не повинна з'явитися в currentStock.
//                    // B005 з change: 0, якщо її не було на складі раніше, то вона не з'явиться. Якщо була, то залишиться як є.
//                    // В цьому випадку, оскільки B005 з'явилася вперше з change: 0, вона не має бути в currentStock.
//                    // Corrected expected stock: { 'B001': 2, 'B002': 2, 'B003': 7, 'B004': 12 }
//     },
//     totalValue: 699.00, // (2*22) + (2*25) + (7*30) + (12*18) = 44 + 50 + 210 + 216 = 520 (Error in my manual calc, let's recheck with the expected 699.00)
//                        // Let's re-calculate totalValue based on the corrected stock and last known prices.
//                        // B001: 2 * 22.00 = 44.00
//                        // B002: 2 * 25.00 = 50.00
//                        // B003: 7 * 30.00 = 210.00
//                        // B004: 12 * 18.00 = 216.00
//                        // Total: 44 + 50 + 210 + 216 = 520.00
//                        // My expected result (699.00) seems off with the given sample data and my interpretation.
//                        // Let's assume totalValue should be calculated based on the *correct* stock and last price.
//                        // For a 6 kyu problem, it's about the logic. I will stick to my calculated 520.00 based on the sample.
//                        // If the test has 699.00, the sample data must be different.
//     mostPopularBook: { bookId: 'B001', title: 'The Great Adventure', author: 'A. Author', totalSoldQuantity: 8 }, // 3 + 5 = 8
//     leastPopularBook: { bookId: 'B003', title: 'Data Structures 101', author: 'C. Algo', totalSoldQuantity: 1 } // 1
//   }
const bookEntries = [
  { bookId: 'B001', title: 'The Great Adventure', author: 'A. Author', price: 22.00, change: 10, timestamp: new Date('2024-01-01T10:00:00Z') },
  { bookId: 'B002', title: 'Mysteries of JS', author: 'B. Coder', price: 25.00, change: 5, timestamp: new Date('2024-01-01T10:05:00Z') },
  { bookId: 'B001', title: 'The Great Adventure', author: 'A. Author', price: 22.00, change: -3, timestamp: new Date('2024-01-02T11:00:00Z') }, // Продано 3
  { bookId: 'B003', title: 'Data Structures 101', author: 'C. Algo', price: 30.00, change: 8, timestamp: new Date('2024-01-03T09:00:00Z') },
  { bookId: 'B002', title: 'Mysteries of JS', author: 'B. Coder', price: 25.00, change: -2, timestamp: new Date('2024-01-04T14:30:00Z') }, // Продано 2
  { bookId: 'B001', title: 'The Great Adventure', author: 'A. Author', price: 22.00, change: -5, timestamp: new Date('2024-01-05T16:00:00Z') }, // Продано 5 (зміна ціни)
  { bookId: 'B004', title: 'Clean Code Basics', author: 'D. Best', price: 18.00, change: 12, timestamp: new Date('2024-01-06T10:00:00Z') },
  { bookId: 'B003', title: 'Data Structures 101', author: 'C. Algo', price: 30.00, change: -1, timestamp: new Date('2024-01-07T11:00:00Z') }, // Продано 1
  { bookId: 'B002', title: 'Mysteries of JS', author: 'B. Coder', price: 25.00, change: -1, timestamp: new Date('2024-01-08T12:00:00Z') }, // Продано 1
  { bookId: 'B005', title: 'Web Development Guide', author: 'E. Dev', price: 35.00, change: 0, timestamp: new Date('2024-01-09T09:00:00Z') } // Нульова зміна
];
function analyzeStock(arr) {
  let filteredArr = {};

  arr.forEach(element => {
    if (!filteredArr[element.bookId]) {
      filteredArr[element.bookId] = [element];
    } else {
      filteredArr[element.bookId].push(element);
    }
  });
let currentStock = {};
  let latestPrice = {};
  let salesMap = {};
  Object.keys(filteredArr).forEach(bookId => {
    let quantity = 0;
    filteredArr[bookId].forEach(entry => { quantity += entry.change;latestPrice[bookId] = entry.price;
      if (entry.change < 0) {
        if (!salesMap[bookId]) {salesMap[bookId] = {
          bookId: entry.bookId,
            title: entry.title,
            author: entry.author,
            totalSoldQuantity: 0
          };
        }
        salesMap[bookId].totalSoldQuantity += Math.abs(entry.change);
      }
    });
    if (filteredArr[bookId].some(e => e.change !== 0)) {currentStock[bookId] = quantity;
    }
  });
  let totalValue = Object.keys(currentStock).reduce((acc, bookId) => {return acc + currentStock[bookId] * latestPrice[bookId];
  }, 0);
  let salesList = Object.values(salesMap);
  let mostPopularBook = salesList.reduce((acc, curr) => {
    return !acc || curr.totalSoldQuantity > acc.totalSoldQuantity ? curr : acc;}, null);
  let leastPopularBook = salesList.reduce((acc, curr) => { 
    return !acc || curr.totalSoldQuantity < acc.totalSoldQuantity ? curr : acc;}, null);
  return {currentStock, totalValue, mostPopularBook, leastPopularBook
  };
}
console.log(analyzeStock(bookEntries));
console.log("Задача про аналіз логів");
// Ваша задача - написати функцію, яка приймає масив логів і повертає об'єкт, який містить статистику по логам.
// Кожен лог містить IP-адресу, дату, час, метод HTTP, URL-адресу, код відповіді та розмір відповіді.
// mostFreqPath: "/api/users?id=123"
//averageSize: 800
//status: {200: 5, 201: 1, 404: 1, 500: 1}
//uniq: ["192.168.1.10", "192.168.1.11", "192.168.1.12", "192.168.1.13"]
//total: 800
const logEntries = [
  '192.168.1.10 - [07/Apr/2025:10:35:10 +0300] "GET /api/users?id=123 HTTP/1.1" 200 450',
  '192.168.1.11 - [07/Apr/2025:10:35:15 +0300] "POST /api/products HTTP/1.1" 201 120',
  '192.168.1.10 - [07/Apr/2025:10:35:20 +0300] "GET /images/logo.png HTTP/1.1" 404 0',
  '192.168.1.12 - [07/Apr/2025:10:35:25 +0300] "GET /api/users HTTP/1.1" 200 800',
  '192.168.1.10 - [07/Apr/2025:10:35:30 +0300] "GET /api/users?id=123 HTTP/1.1" 200 450',
  '192.168.1.11 - [07/Apr/2025:10:35:35 +0300] "GET /index.html HTTP/1.1" 200 1500',
  '192.168.1.13 - [07/Apr/2025:10:35:40 +0300] "GET /api/data HTTP/1.1" 500 50',
  '192.168.1.12 - [07/Apr/2025:10:35:45 +0300] "GET /api/users HTTP/1.1" 200 800'
];
function counting(arr, obj) {
  arr.forEach(el => {
    if (obj[el] === undefined) {
      obj[el] = 1;
    } else {
      obj[el] += 1;
    }
  });
  return obj;
}

function analyzed(arr) {
  let modifiedArr = arr.map(el => el.split("-")[0].slice(0, -1));
  let total = modifiedArr.length;

  let uniq = {};
  uniq = counting(modifiedArr, uniq);
  uniq = Object.entries(uniq).sort((a, b) => b[1] - a[1]).map(el => el[0])

  let status = {};
  status = counting(arr.map(el => el.split('"')[2].substring(1, 4)), status);
  status = Object.fromEntries(Object.entries(status).sort((a, b) => b[1] - a[1]));

  let mostFreqPath = {};
  mostFreqPath = counting(arr.map(el => el.split(" ")[5]), mostFreqPath);
  mostFreqPath = Object.entries(mostFreqPath).sort((a, b) => b[1] - a[1])[0][0];

  let averageSize = arr.filter(el => el.split('"')[2].substring(1, 4) === "200");
  averageSize = averageSize.map(el => Number(el.split(" ")[8])).reduce((acc, el) => acc + el, 0) / averageSize.length;
  return {total: total,uniqueIPs: uniq,status: status,mostFreqPath: mostFreqPath,averageSize: averageSize,
    
  };
}

console.log(analyzed(logEntries));