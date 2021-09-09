 function capitalizeArrayWords(array) {
      // A function that takes in an array of strings and capitalizes
      // first letter of each word in a string
      const newArr = array.map(str => {
        const splitString = str.split(' ');
        const capitalizedArray = splitString.map(word => {
          return word[0].toUpperCase() + word.slice(1);
        });
        const capitalizedString = capitalizedArray.join(' ');
        return capitalizedString;
      });
      return newArr;
    };

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export {numberWithCommas, capitalizeArrayWords};


