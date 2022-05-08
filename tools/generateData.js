process.stdin.setEncoding('utf8');

const data = [];

function readline() {
  return new Promise((resolve, reject) => {
    process.stdin.resume;
    process.stdin.once('data', data => {
      process.stdin.resume();
      resolve(data);
    })
  })
}

function log(data) {
  console.log(data);
}

function addNewline(str, where) {
  const strArr = str.split(where);
  for (let i = 1; i < strArr.length; i++)
    strArr[i] = `\\n${strArr[i]}`;
  return strArr.join(where);
}

function addNewlineAfterPunctuation(str) {
  str = addNewline(str, "，")
  str = addNewline(str, "；")
  str = addNewline(str, "？")
  str = addNewline(str, "！")
  str = addNewline(str, "：")
  str = addNewline(str, "。");
  return str;
}

(async () => {
  for (let i = 0;;i++) {
    log("\33[2J");

    log("标题：");
    // just type string
    const t = (await readline()).trim();
    if (t === 'end') 
      break;
    data.push(`\`${t}\n`);

    log("朝代 + 作者：");
    // e.g: 东汉末+曹操
    const dynastyAndAuthor = (await readline()).trim();
    data[i] += `【${dynastyAndAuthor.split("+")[0]}】\\n${dynastyAndAuthor.split("+")[1]}\n`;
    
    // 输入内容，输入 end 结束
    log("内容：");
    for (;;) {
      const type = (await readline()).trim();
      if (type === 'endContent')
        break;

      let added = addNewlineAfterPunctuation(type).trim();
      if (added.endsWith('\\n'))
        added = added.substring(0, added.length - 2);
      data[i] += `${added}\n`;
    }

    data[i] = data[i].trim() + '`';
  }
  log(data.join(',\n\n') + ',');
})();
