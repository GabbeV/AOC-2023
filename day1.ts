import type { Input, SampleInputPart1, SampleInputPart2 } from "./day1.input.ts";
import type { AsLines, Digit, FirstOf, LastOf, SumTDNums, TDNumToString } from "./utils.ts";

type SolvePart1<T> = TDNumToString<SumTDNums<MapLinesPart1<AsLines<T>>>>;
type MapLinesPart1<T> = { [I in keyof T]: [LastOf<Digit, T[I]>, FirstOf<Digit, T[I]>] };

export type SampleResult = SolvePart1<SampleInputPart1>;
// export type Result = SolvePart1<Input>;

type DigitPart2 = Digit | "one" | "two" | "three" | "four" | "five" | "six" | "seven" | "eight" | "nine";

type Part2Map =
	& { [D in Digit]: D }
	& {
		"one": "1";
		"two": "2";
		"three": "3";
		"four": "4";
		"five": "5";
		"six": "6";
		"seven": "7";
		"eight": "8";
		"nine": "9";
	};

type SolvePart2<T> = TDNumToString<SumTDNums<MapLinesPart2<AsLines<T>>>>;
type MapLinesPart2<T> = { [I in keyof T]: [Part2Map[LastOf<DigitPart2, T[I]>], Part2Map[FirstOf<DigitPart2, T[I]>]] };

export type SampleResultPart2 = SolvePart2<SampleInputPart2>;
// export type ResultPart2 = SolvePart2<Input>;
