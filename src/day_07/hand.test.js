const { Hand, Type } = require("./hand");

describe("string to ordered", () => {
  it("simples 1", () => {
    expect(Hand.stringHandToOrdered("23456")).toStrictEqual([0, 1, 2, 3, 4]);
  });
  it("simples 2", () => {
    expect(Hand.stringHandToOrdered("78956")).toStrictEqual([5, 6, 7, 3, 4]);
  });
  it("pictures", () => {
    expect(Hand.stringHandToOrdered("TJQKA")).toStrictEqual([8, 9, 10, 11, 12]);
  });
  it("doubles", () => {
    expect(Hand.stringHandToOrdered("TT266")).toStrictEqual([8, 8, 0, 4, 4]);
  });
  it("triples", () => {
    expect(Hand.stringHandToOrdered("92939")).toStrictEqual([7, 0, 7, 1, 7]);
  });
  it("quadruples", () => {
    expect(Hand.stringHandToOrdered("92999")).toStrictEqual([7, 0, 7, 7, 7]);
  });
  it("quintuples", () => {
    expect(Hand.stringHandToOrdered("99999")).toStrictEqual([7, 7, 7, 7, 7]);
  });
});

describe("ordered to counted", () => {
  it("simples 1", () => {
    expect(Hand.orderedHandToCounted([0, 1, 2, 3, 4])).toStrictEqual([
      1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
    ]);
  });
  it("simples 2", () => {
    expect(Hand.orderedHandToCounted([5, 6, 7, 3, 4])).toStrictEqual([
      0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0,
    ]);
  });
  it("pictures", () => {
    expect(Hand.orderedHandToCounted([8, 9, 10, 11, 12])).toStrictEqual([
      0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
    ]);
  });
  it("doubles", () => {
    expect(Hand.orderedHandToCounted([8, 8, 0, 4, 4])).toStrictEqual([
      1, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0,
    ]);
  });
  it("triples", () => {
    expect(Hand.orderedHandToCounted([7, 0, 7, 1, 7])).toStrictEqual([
      1, 1, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0,
    ]);
  });
  it("quadruples", () => {
    expect(Hand.orderedHandToCounted([7, 0, 7, 7, 7])).toStrictEqual([
      1, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0,
    ]);
  });
  it("quintuples", () => {
    expect(Hand.orderedHandToCounted([7, 7, 7, 7, 7])).toStrictEqual([
      0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0,
    ]);
  });
});

describe("rate hand", () => {
  const evaluateTypeOfString = str =>
    Hand.evaluateType(Hand.orderedHandToCounted(Hand.stringHandToOrdered(str)));

  it("five of a kind", () => {
    expect(evaluateTypeOfString("55555")).toBe(Type.FIVE_OF_A_KIND);
  });
  it("four of a kind", () => {
    expect(evaluateTypeOfString("55J55")).toBe(Type.FOUR_OF_A_KIND);
  });
  it("full house", () => {
    expect(evaluateTypeOfString("Q44Q4")).toBe(Type.FULL_HOUSE);
  });
  it("three of a kind", () => {
    expect(evaluateTypeOfString("343K3")).toBe(Type.THREE_OF_A_KIND);
  });
  it("two pairs", () => {
    expect(evaluateTypeOfString("3K5K3")).toBe(Type.TWO_PAIR);
  });
  it("pair", () => {
    expect(evaluateTypeOfString("35J6J")).toBe(Type.PAIR);
  });
  it("high card", () => {
    expect(evaluateTypeOfString("34567")).toBe(Type.HIGH_CARD);
  });
});

describe("parse hands", () => {
  it("generic", () => {
    const hand = new Hand("25KJK");
    expect(hand.raw).toBe("25KJK");
    expect(hand.ordered).toStrictEqual([0, 3, 11, 9, 11]);
    expect(hand.counted).toStrictEqual([1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 2, 0]);
    expect(hand.type).toBe(Type.PAIR);
  });
});

describe("compare hands", () => {
  it("different types smaller", () => {
    expect(new Hand("25KJK").compareTo(new Hand("23322"))).toBeLessThan(0);
  });
  it("different types larger", () => {
    expect(new Hand("QQQQQ").compareTo(new Hand("23322"))).toBeGreaterThan(0);
  });
  it("same types smaller", () => {
    expect(new Hand("23444").compareTo(new Hand("23555"))).toBeLessThan(0);
  });
  it("same types larger", () => {
    expect(new Hand("23888").compareTo(new Hand("23555"))).toBeGreaterThan(0);
  });
  it("same", () => {
    expect(new Hand("23888").compareTo(new Hand("23888"))).toBe(0);
  });
});

describe("promote types through joker", () => {
  const testPromotion = (str, before, after, promoter) => {
    const hand = new Hand(str);
    const handJokered = promoter(hand);
    expect(hand.type).toBe(before);
    expect(handJokered.type).toBe(after);
    expect(hand.ordered).toBe(handJokered.ordered);
    expect(hand.counted).toBe(handJokered.counted);
  };

  const promoters = [
    ["promoter with reevaluation", hand => hand.promoteTypeWithJoker()],
    [
      "promoter with simple if clauses",
      hand => hand.promoteTypeWithJokerSimple(),
    ],
  ];

  promoters.forEach(([name, promoter], i) => {
    describe(name, () => {
      it("no joker", () =>
        testPromotion("23456", Type.HIGH_CARD, Type.HIGH_CARD, promoter));
      it("from high card to pair", () =>
        testPromotion("2345J", Type.HIGH_CARD, Type.PAIR, promoter));
      it("from pair to three of a kind", () =>
        testPromotion("2545J", Type.PAIR, Type.THREE_OF_A_KIND, promoter));
      it("from joker pair to three of a kind", () =>
        testPromotion("2J45J", Type.PAIR, Type.THREE_OF_A_KIND, promoter));
      it("from two pair to four of a kind", () =>
        testPromotion("J5KJK", Type.TWO_PAIR, Type.FOUR_OF_A_KIND, promoter));
      it("from two pair to full house", () =>
        testPromotion("2233J", Type.TWO_PAIR, Type.FULL_HOUSE, promoter));
      it("from joker three of a kind to four of a kind", () =>
        testPromotion(
          "JK2JJ",
          Type.THREE_OF_A_KIND,
          Type.FOUR_OF_A_KIND,
          promoter,
        ));
      it("from four a kind to five of a kind", () =>
        testPromotion(
          "KKKJK",
          Type.FOUR_OF_A_KIND,
          Type.FIVE_OF_A_KIND,
          promoter,
        ));
      it("from joker four a kind to five of a kind", () =>
        testPromotion(
          "JJJJK",
          Type.FOUR_OF_A_KIND,
          Type.FIVE_OF_A_KIND,
          promoter,
        ));
      it("from full house to five of a kind", () =>
        testPromotion("JKKJK", Type.FULL_HOUSE, Type.FIVE_OF_A_KIND, promoter));
    });
  });
});
