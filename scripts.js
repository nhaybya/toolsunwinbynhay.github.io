// JavaScript Code

let password = "Nhayy";
let attemptCount = 0;
let capital = 0;
let currentGame = "Sun.win 🤖"; // Only one game available

// Init main function
document.addEventListener('DOMContentLoaded', () => {
  promptPassword();
});

// Function to prompt for password
async function promptPassword() {
  const { value: enteredPassword, isConfirmed } = await Swal.fire({
    title: '🔒 Enter Password',
    input: 'password',
    inputLabel: 'Password',
    inputPlaceholder: '🔑',
    showCancelButton: true,
    confirmButtonText: 'Xác Nhận',
    cancelButtonText: 'Thoát',
    inputAttributes: {
      autocapitalize: 'off',
      autocorrect: 'off'
    }
  });

  if (isConfirmed) {
    if (enteredPassword === password) {
      await showWelcomeMessage();
      await askForCapital();
    } else {
      attemptCount++;
      if (attemptCount >= 2) {
        await showContactOption();
      } else {
        await showPasswordError();
      }
    }
  } else {
    Swal.fire('Thoát ứng dụng.', '', 'info');
  }
}

// Function to show welcome message
async function showWelcomeMessage() {
  await Swal.fire({
    title: 'Tool By Nhayy',
    text: 'Xin chào bạn! Hôm nay Nhayy sẽ giúp bạn về bờ nhé 🤝!',
    icon: 'success',
    confirmButtonText: 'Tôi Kì Vọng Vào Bạn ??'
  });
}

// Function to ask for capital
async function askForCapital() {
  const { value: inputCapital, isConfirmed } = await Swal.fire({
    title: 'Nhập số tiền vốn',
    input: 'text',
    inputLabel: 'Vd : 500k',
    inputPlaceholder: 'Vd : 500k',
    showCancelButton: true,
    confirmButtonText: 'Xác Nhận',
    cancelButtonText: 'Thoát',
    inputValidator: (value) => {
      if (!value) {
        return 'Bạn cần nhập số tiền!';
      }
      const num = parseFloat(value.replace(/[^0-9]/g, ''));
      if (isNaN(num) || num <= 0) {
        return 'Số tiền không hợp lệ!';
      }
      return null;
    }
  });

  if (isConfirmed) {
    const input = inputCapital.replace(/[^0-9]/g, '');
    capital = parseFloat(input);
    await mainMenu();
  } else {
    Swal.fire('Thoát ứng dụng.', '', 'info');
  }
}

// Function to show password error
async function showPasswordError() {
  const { isConfirmed } = await Swal.fire({
    title: '🔒',
    text: 'KEY không chính xác!',
    icon: 'error',
    showCancelButton: true,
    confirmButtonText: 'Nhập Lại',
    cancelButtonText: 'Thoát'
  });

  if (isConfirmed) {
    await promptPassword();
  } else {
    Swal.fire('Thoát ứng dụng.', '', 'info');
  }
}

// Function to show contact option after multiple failed attempts
async function showContactOption() {
  const { isConfirmed } = await Swal.fire({
    title: 'Bạn đã nhập sai mật khẩu quá 2 lần!',
    text: 'Vui lòng liên hệ để được hỗ trợ.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Liên hệ',
    cancelButtonText: 'Thử lại'
  });

  if (isConfirmed) {
    window.open("https://facebook.com/Nhayydzvcl", "_blank");
  } else {
    await promptPassword();
  }
}

// Function to show main menu
async function mainMenu() {
  const { isConfirmed } = await Swal.fire({
    title: '🔮 Chọn trò chơi',
    text: 'Nhayy Sẽ Kéo Bạn Chứ Aii',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sun.win',
    cancelButtonText: 'Thoát'
  });

  if (isConfirmed) {
    await getDiceResult(currentGame);
  } else {
    Swal.fire('Đã hủy.', '', 'info');
  }
}

// Function to get random bet based on capital
function getRandomBet() {
  const maxBet = Math.floor(capital * 0.5); // 50% vốn
  const minBet = 5; // Minimum bet

  if (maxBet < minBet) return null; // Not enough capital to bet

  // Random bet between minBet and maxBet
  const betAmount = Math.floor(Math.random() * (maxBet - minBet + 1)) + minBet;

  return betAmount;
}

// Function to get dice result
async function getDiceResult(gameName) {
  const { value: diceInput, isConfirmed } = await Swal.fire({
    title: '🎲 Nhập kết quả 3 xúc sắc',
    text: "Vui lòng nhập 3 số từ 1 đến 6, cách nhau bằng dấu '-'. Vd: 5-6-1",
    input: 'text',
    inputPlaceholder: '5-6-1',
    showCancelButton: true,
    confirmButtonText: 'Xác Nhận',
    cancelButtonText: 'Thoát',
    inputValidator: (value) => {
      if (!value) {
        return 'Vui lòng nhập kết quả!';
      }
      const numbers = value.split('-').map(num => parseInt(num.trim(), 10));
      if (
        numbers.length !== 3 ||
        numbers.some(isNaN) ||
        numbers.some(n => n < 1 || n > 6)
      ) {
        return 'Vui lòng nhập đúng định dạng 3 số từ 1 đến 6, cách nhau bằng dấu \'-\'.';
      }
      return null;
    }
  });

  if (isConfirmed) {
    const input = diceInput;
    const numbers = input.split('-').map(num => parseInt(num.trim(), 10));

    const [num1, num2, num3] = numbers;

    const sum = num2 * num3 / num1;
    const average = sum * 2;

    const isEven = (sum % 2 === 0);
    let resultType = isEven ? "Xỉu" : "Tài";

    if (numbers.includes(1)) {
      resultType = "Xỉu";
    }

    const percentage = Math.floor(Math.random() * 11) + 90; // 90-100%

    const betAmount = getRandomBet();
    if (betAmount === null) {
      await Swal.fire({
        title: "Không đủ vốn để đặt cược.",
        text: `Vốn của bạn là ${formatCurrency(capital)}, không thể đặt cược.`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    const initialResult = {
      type: resultType,
      percentage: percentage,
      betAmount: betAmount
    };

    await processAdditionalSteps(gameName, initialResult);
  } else {
    Swal.fire('Thoát ứng dụng.', '', 'info');
  }
}

// Function to process additional steps
async function processAdditionalSteps(gameName, initialResult) {
  // Step 1: Choose side with fewer bets
  const { isConfirmed: lowBetsConfirmed } = await Swal.fire({
    title: 'Bên nào là bên ít người đặt cược?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Tài',
    cancelButtonText: 'Xỉu'
  });

  const lowBets = lowBetsConfirmed ? "tài" : "xỉu";

  // Step 2: Choose side with less money being pumped
  const { isConfirmed: lowMoneyConfirmed } = await Swal.fire({
    title: 'Bên nào là bên ít tiền đang bơm?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'tài',
    cancelButtonText: 'xỉu'
  });

  const lowMoney = lowMoneyConfirmed ? "Tài" : "Xỉu";

  // Determine final result
  let finalResultType = initialResult.type;

  // Currently, the logic sets finalResultType to initialResult.type regardless of lowBets and lowMoney
  // You can modify this logic if you have specific rules to change finalResultType based on lowBets and lowMoney
  if (lowBets !== lowMoney) {
    // Example logic: If lowBets and lowMoney are different, maintain the initial result
    finalResultType = initialResult.type;
  } else {
    // If both are the same, also maintain the initial result
    finalResultType = initialResult.type;
  }

  // Show final result
  await Swal.fire({
    title: `Kết quả cuối cùng của ${gameName}`,
    html: `
      <strong>Kết quả dựa trên xúc sắc:</strong> ${capitalizeFirstLetter(initialResult.type)}<br>
      <strong>Bên ít người đặt cược:</strong> ${capitalizeFirstLetter(lowBets)}<br>
      <strong>Bên ít tiền đang bơm:</strong> ${capitalizeFirstLetter(lowMoney)}<br>
      <hr>
      <strong>→ Kết quả cuối cùng:</strong> ${capitalizeFirstLetter(finalResultType)}
    `,
    icon: 'info',
    confirmButtonText: 'Xác Nhận'
  });

  // Proceed to betting
  await performBetting(gameName, finalResultType, initialResult.percentage, initialResult.betAmount);
}

// Function to perform betting
async function performBetting(gameName, finalResultType, percentage, betAmount) {
  const { isConfirmed } = await Swal.fire({
    title: `Kết quả soi cầu ${gameName}`,
    text: `${capitalizeFirstLetter(finalResultType)} ${percentage}% ${betAmount}k`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Liếm',
    cancelButtonText: 'Gãy'
  });

  if (isConfirmed) { // Chose "Liếm"
    capital += betAmount;
    await Swal.fire({
      title: 'Thành công!',
      text: `Bạn đã Liếm và cộng thêm ${betAmount}k. Vốn hiện tại: ${formatCurrency(capital)}.`,
      icon: 'success',
      confirmButtonText: 'OK'
    });
    await checkCapital();
  } else { // Chose "Gãy"
    capital -= betAmount;
    await Swal.fire({
      title: 'Đã trừ!',
      text: `Bạn đã Gãy và trừ ${betAmount}k. Vốn hiện tại: ${formatCurrency(capital)}.`,
      icon: 'warning',
      confirmButtonText: 'OK'
    });
    await checkCapital();
  }
}

// Function to check capital
async function checkCapital() {
  if (capital <= 0) {
    capital = 0;
    await Swal.fire({
      title: 'Đã hết vốn',
      text: 'Nhayy xin lỗi bạn 😓',
      icon: 'error',
      confirmButtonText: 'Buồn qua ☺️'
    });
    console.log("Đã hết vốn.");
  } else {
    await showCapital();
  }
}

// Function to show remaining capital
async function showCapital() {
  const formattedCapital = formatCurrency(capital);
  let message = `Bạn còn lại: ${formattedCapital}`;

  if (capital > 1000) {
    message += "\nNhayy Chúc mừng bạn đã về bờ 🥳";
    const { isConfirmed } = await Swal.fire({
      title: 'Số tiền còn lại',
      text: message,
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Dừng Lại',
      cancelButtonText: 'Đọc tiếp'
    });

    if (isConfirmed) {
      await showSuccessMessage();
    } else {
      await getDiceResult(currentGame);
    }
  } else {
    const { isConfirmed } = await Swal.fire({
      title: 'Số tiền còn lại',
      text: message,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Đọc tiếp',
      cancelButtonText: 'Thoát'
    });

    if (isConfirmed) {
      await getDiceResult(currentGame);
    } else {
      Swal.fire('Thoát ứng dụng.', '', 'info');
    }
  }
}

// Function to show success message upon stopping
async function showSuccessMessage() {
  await Swal.fire({
    title: "Xin ít lộc Nhé STK:0348319495 MB!!!",
    text: "😳",
    icon: 'success',
    confirmButtonText: 'Ok Nè ✨'
  });
  console.log("Rút tiền thành công.");
}

// Function to format currency
function formatCurrency(amount) {
  if (amount >= 1000000) {
    const million = Math.floor(amount / 1000000);
    const thousand = Math.floor((amount % 1000000) / 1000);
    return `${million}m${thousand > 0 ? thousand + "k" : ''}`;
  }
  return `${Math.floor(amount)}k`;
}

// Function to capitalize first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
