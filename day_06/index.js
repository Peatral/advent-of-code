const {read_input} = require("../utility")

const get_characters_to_process = (text, length) => new RegExp(
  [...Array(length - 1).keys()]
    .map(group => 
      `(.)(?!${
        [...Array(group + 1).keys()]
          .map(idx => `\\${idx + 1}`)
          .join("|")
      })`)
    .join("") + "."
).exec(text).index + length;

const input = read_input();
console.log(
  get_characters_to_process(input, 4) + "\n" + 
  get_characters_to_process(input, 14)
);

/**
 * This is essentially what we are matching: 
 * /(.)(?!\1)(.)(?!\1|\2)(.)(?!\1|\2|\3)./
 * 
 * Basically capture each character in a group and be sure all groups that already exist don't follow.
 * The last one obviously doesn't need that check and so it is not captured in a group.
 * 
 * Regex Breakdown
 * Each block besides the last has a capturing group (.) that matches any character and a negative lookahead
 * that matches all groups so far (?! $ ) with $ being the existing groups (something like \1|\2|\3 etc., split
 * with an | because we want to check if its any of them and not all of them concatted)
 */