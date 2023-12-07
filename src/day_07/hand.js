const { sum } = require("../utility");

const CardOrder = {
  CARD_ORDER_A: "23456789TJQKA",
  CARD_ORDER_B: "J23456789TQKA",
};

const Type = {
  FIVE_OF_A_KIND: 6,
  FOUR_OF_A_KIND: 5,
  FULL_HOUSE: 4,
  THREE_OF_A_KIND: 3,
  TWO_PAIR: 2,
  PAIR: 1,
  HIGH_CARD: 0,
};

class Hand {
  raw;
  ordered;
  counted;
  type;
  cardOrder;

  constructor(str, cardOrder = CardOrder.CARD_ORDER_A) {
    this.cardOrder = cardOrder;
    this.raw = str;
    this.ordered = Hand.stringHandToOrdered(this.raw, this.cardOrder);
    this.counted = Hand.orderedHandToCounted(this.ordered, this.cardOrder);
    this.type = Hand.evaluateType(this.counted);
  }

  static stringHandToOrdered(str, cardOrder = CardOrder.CARD_ORDER_A) {
    return str.split("").map(c => cardOrder.indexOf(c));
  }

  static orderedHandToCounted(ordered, cardOrder = CardOrder.CARD_ORDER_A) {
    return Array(cardOrder.length)
      .fill(0)
      .map((_, i) => ordered.filter(x => x == i).length);
  }

  static evaluateType(counted) {
    if (counted.reduce(sum, 0) !== 5) {
      return -1;
    }
    if (counted.includes(5)) {
      return Type.FIVE_OF_A_KIND;
    }
    if (counted.includes(4)) {
      return Type.FOUR_OF_A_KIND;
    }
    if (counted.includes(3) && counted.includes(2)) {
      return Type.FULL_HOUSE;
    }
    if (counted.includes(3)) {
      return Type.THREE_OF_A_KIND;
    }
    if (counted.indexOf(2, counted.indexOf(2) + 1) !== -1) {
      return Type.TWO_PAIR;
    }
    if (counted.includes(2)) {
      return Type.PAIR;
    }
    return Type.HIGH_CARD;
  }

  promoteTypeWithJoker() {
    const jokerIdx = this.cardOrder.indexOf("J");
    const jokerAmount = this.counted[jokerIdx];
    if (jokerAmount === 0 || jokerAmount === 5) {
      return this;
    }
    const bestCardIdx = [...this.counted.entries()]
      .filter(e => e[0] !== jokerIdx)
      .sort((a, b) => (b[1] !== a[1] ? b[1] - a[1] : b[0] - a[0]))[0][0];
    const newCounted = this.counted;
    newCounted[jokerIdx] = 0;
    newCounted[bestCardIdx] += jokerAmount;
    const clone = this.clone();
    clone.type = Hand.evaluateType(newCounted);
    return clone;
  }

  compareTo(b) {
    if (this.type !== b.type) {
      return this.type - b.type;
    }
    for (let i = 0; i < 5; i++) {
      if (this.ordered[i] !== b.ordered[i]) {
        return this.ordered[i] - b.ordered[i];
      }
    }
    return 0;
  }

  clone() {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }
}

module.exports = { Hand, CardOrder, Type };
