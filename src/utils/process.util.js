function sum() {
  let result = 0;
  for (let i = 0; i < 5e9; i++) {
    result += 1;
  }
  return result;
}

export default sum;

process.on("message", ()=> process.send(sum()))
