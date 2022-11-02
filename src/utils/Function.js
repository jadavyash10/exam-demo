export function reset(obj) {
    const newObj = Object.keys(obj).reduce((accumulator, current) => {
      if (current !== "subjectName") {
        accumulator[current] = "";
      }
      return accumulator;
    }, {});
    return newObj;
  }