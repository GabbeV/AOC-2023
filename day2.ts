import type { Input, SampleInput } from "./day2.input";
import type { AsLines, MulTDNum, Split, SumTDNums, TDNumToString, ToTDNum } from "./utils";

type SolvePart1<T> = TDNumToString<SumTDNums<MapLinesPart1<AsLines<T>>>>;
type MapLinesPart1<T> = {
	[I in keyof T]: ParseGame<T[I]> extends ValidGame ? ToTDNum<ParseGame<T[I]>["id"]> : ToTDNum<0>;
};

type ParseGame<T> = T extends `Game ${infer Id}: ${infer Hands}` ? { id: Id; hands: ParseHands<Split<"; ", Hands>> }
	: never;

type ParseHands<T> = { [I in keyof T]: ParseDice<Split<", ", T[I]>> };

type ParseDice<T extends any[]> = {
	[I in keyof T]: T[I] extends `${infer N} ${infer Color}` ? (x: { [_ in Color]: N }) => void
		: never;
}[number] extends (x: infer X) => void ? X : never;

type ValidGame = {
	id: any;
	hands: {
		red?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12";
		green?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13";
		blue?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14";
	}[];
};

export type SampleResultPart1 = SolvePart1<SampleInput>;
// export type ResultPart1 = SolvePart1<Input>;

type SolvePart2<T> = TDNumToString<SumTDNums<MapLinesPart2<AsLines<T>>>>;
type MapLinesPart2<T> = {
	[I in keyof T]: MulTDNum<
		MulTDNum<
			ToTDNum<Max<DiceCounts<"red", ParseGame<T[I]>["hands"]>>>,
			ToTDNum<Max<DiceCounts<"green", ParseGame<T[I]>["hands"]>>>
		>,
		ToTDNum<Max<DiceCounts<"blue", ParseGame<T[I]>["hands"]>>>
	>;
};

type DiceCounts<Color extends string, T extends any[]> = {
	[I in keyof T]: T[I] extends { [_ in Color]: infer X } ? X : never;
}[number];

type Max<T> =
	/* dprint-ignore */
	"20" extends T ? "20"
	: "19" extends T ? "19"
	: "18" extends T ? "18"
	: "17" extends T ? "17"
	: "16" extends T ? "16"
	: "15" extends T ? "15"
	: "14" extends T ? "14"
	: "13" extends T ? "13"
	: "12" extends T ? "12"
	: "11" extends T ? "11"
	: "10" extends T ? "10"
	: "9" extends T ? "9"
	: "8" extends T ? "8"
	: "7" extends T ? "7"
	: "6" extends T ? "6"
	: "5" extends T ? "5"
	: "4" extends T ? "4"
	: "3" extends T ? "3"
	: "2" extends T ? "2"
	: "1" extends T ? "1"
	: "0";

export type SampleResultPart2 = SolvePart2<SampleInput>;
// export type ResultPart2 = SolvePart2<Input>;
