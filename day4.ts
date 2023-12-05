import type { Input, SampleInput } from "./day4.input";
import type {
	AddTDNum,
	AsLines,
	FilterTuple,
	Pow2TNum,
	SumTDNums,
	TDNum,
	TDNum1,
	TDNumToString,
	TNum0,
	ToTDNum,
} from "./utils";

type SolvePart1<T> = TDNumToString<SumTDNums<MapLinesPart1<AsLines<T>>>>;

type MapLinesPart1<T> = {
	[I in keyof T]: T[I] extends `Card ${any}:${infer W} |${infer N}` ? ToTDNum<
			FilterTuple<
				ParseNumbers<W>[number],
				ParseNumbers<N>
			> extends [any, ...infer Rest] ? Pow2TNum<Rest>["length"]
				: 0
		>
		: never;
};

type ParseNumbers<T, State extends any[] = []> = T extends `  ${infer D}${infer Rest}`
	? ParseNumbers<Rest, [...State, D]>
	: T extends ` ${infer D0}${infer D1}${infer Rest}` ? ParseNumbers<Rest, [...State, `${D0}${D1}`]>
	: State;

export type SampleResultPart1 = SolvePart1<SampleInput>;
// export type ResultPart1 = SolvePart1<Input>;

type SolvePart2<T> = TDNumToString<RecursePart2<AsLines<T>>>;

type RecursePart2<Lines, State extends TDNum = TNum0, LineCounts = []> =
	/* dprint-ignore */
	Lines extends [infer Line, ...infer LinesRest]
		? LineCounts extends [infer LineCount, ...infer LineCountsRest]
			? RecursePart2<
				LinesRest,
				AddTDNum<State, LineCount>,
				UpdateLineCounts<LineCount, LineScore<Line>, LineCountsRest>
			>
			: RecursePart2<
				LinesRest,
				AddTDNum<State, TDNum1>,
				UpdateLineCounts<TDNum1, LineScore<Line>, []>
			>
		: State;

type LineScore<T> = T extends `Card ${any}:${infer W} |${infer N}`
	? FilterTuple<ParseNumbers<W>[number], ParseNumbers<N>>
	: never;

type UpdateLineCounts<N, S, T extends any[], State extends any[] = []> =
	/* dprint-ignore */
	S extends [any, ...infer SRest]
		? T extends [infer X, ...infer TRest]
			? UpdateLineCounts<N, SRest, TRest, [...State, AddTDNum<X, N>]>
			: UpdateLineCounts<N, SRest, [], [...State, AddTDNum<TDNum1, N>]>
		: [...State, ...T];

export type SampleResultPart2 = SolvePart2<SampleInput>;
// export type ResultPart2 = SolvePart2<Input>;
