import type { Input, SampleInput } from "./day3.input";
import type { AsChars, AsLines, Digit, MulTDNum, SumTDNums, TDNumToString, TupleNOf } from "./utils";

type SolvePart1<T> = TDNumToString<SumTDNums<MapTracks<AsTracks<PadY<PadX<MapLines<AsLines<T>>>>>>>>;

type MapLines<T> = { [I in keyof T]: AsChars<T[I]> };

type PadXImpl<T extends any[][]> = { [I in keyof T]: [".", ...T[I], "."] };
type PadX<T> = T extends any[][] ? PadXImpl<T> : never;

type PadY<T> = T extends any[] ? [
		TupleNOf<T[0]["length"], ".">,
		...T,
		TupleNOf<T[0]["length"], ".">,
	]
	: never;

type AsTracks<T, State extends any[] = []> = T extends [infer X1, infer X2, infer X3, ...infer Rest]
	? AsTracks<[X2, X3, ...Rest], [...State, [X1, X2, X3]]>
	: State;

type MapTracks<T> = { [I in keyof T]: SumTDNums<FindParts<T[I]>> };

type S = "#" | "$" | "%" | "&" | "*" | "+" | "-" | "/" | "=" | "@";
type X = "." | S;
type D = Digit;

type StepX<T> = T extends [[any, ...infer R0], [any, ...infer R1], [any, ...infer R2]] ? [R0, R1, R2] : never;

type FindParts<T, State extends any[] = []> =
	/* dprint-ignore */
	T extends [
		[X, X, X, ...any],
		[X, D, X, ...any],
		[X, X, X, ...any],
	] ? FindParts<
		StepX<T>,
		[
			T[0][0],T[0][1],T[0][2],
			T[1][0],        T[1][2],
			T[2][0],T[2][1],T[2][2],
		][number] extends "."
			? State
			: [...State, [T[1][1]]]
	>
	: T extends [
		[X, X, X, X, ...any],
		[X, D, D, X, ...any],
		[X, X, X, X, ...any],
	] ? FindParts<
		StepX<T>,
		[
			T[0][0],T[0][1],T[0][2],T[0][3],
			T[1][0],                T[1][3],
			T[2][0],T[2][1],T[2][2],T[2][3],
		][number] extends "."
			? State
			: [...State, [T[1][2],T[1][1]]]
		>
	: T extends [
		[X, X, X, X, X, ...any],
		[X, D, D, D, X, ...any],
		[X, X, X, X, X, ...any],
	] ? FindParts<
		StepX<T>,
		[
			T[0][0],T[0][1],T[0][2],T[0][3],T[0][4],
			T[1][0],                        T[1][4],
			T[2][0],T[2][1],T[2][2],T[2][3],T[2][4],
		][number] extends "."
			? State
			: [...State, [T[1][3],T[1][2],T[1][1]]]
	>
	: StepX<T> extends never ? State
	: FindParts<StepX<T>, State>;

export type SampleResultPart1 = SolvePart1<SampleInput>;
// export type ResultPart1 = SolvePart1<Input>;

type SolvePart2<T> = TDNumToString<SumTDNums<MapTracksPart2<AsTracks<PadX<PadX<PadX<MapLines<AsLines<T>>>>>>>>>;

type MapTracksPart2<T> = { [I in keyof T]: SumTDNums<FindGears<T[I]>> };

type A = any;
type G = "*";

type FindGears<T, State extends any[] = []> =
	/* dprint-ignore */
	T extends [
		[A, A, A, A, A, A, A, ...any],
		[A, A, A, G, A, A, A, ...any],
		[A, A, A, A, A, A, A, ...any],
	]
		? FilterNever<[
			FindLeft<T[0]>,
			FindLeft<T[1]>,
			FindLeft<T[2]>,
			FindRight<T[0]>,
			FindRight<T[1]>,
			FindRight<T[2]>,
			FindMiddle<T[0]>,
			FindMiddle<T[2]>,
		]> extends [infer X1, infer X2]
			? FindGears<StepX<T>, [...State, MulTDNum<X1, X2>]>
			: FindGears<StepX<T>, State>
		: StepX<T> extends never
			? State
			: FindGears<StepX<T>, State>;

type FilterNever<T, State extends any[] = []> = T extends [never, ...infer Rest] ? FilterNever<Rest, State>
	: T extends [any, ...infer Rest] ? FilterNever<Rest, [...State, T[0]]>
	: State;

type _ = FilterNever<[never, 123, never, "", never]>;

type FindRight<T> =
	/* dprint-ignore */
	T extends [A, A, A, X, D, D, D, ...any] ? [T[6], T[5], T[4]]
	: T extends [A, A, A, X, D, D, A, ...any] ? [T[5], T[4]]
	: T extends [A, A, A, X, D, A, A, ...any] ? [T[4]]
	: never;

type FindLeft<T> =
	/* dprint-ignore */
	T extends [D, D, D, X, A, A, A, ...any] ? [T[2], T[1], T[0]]
	: T extends [A, D, D, X, A, A, A, ...any] ? [T[2], T[1]]
	: T extends [A, A, D, X, A, A, A, ...any] ? [T[2]]
	: never;

type FindMiddle<T> =
	/* dprint-ignore */
	T extends [A, D, D, D, A, A, A, ...any] ? [T[3], T[2], T[1]]
	: T extends [A, A, D, D, D, A, A, ...any] ? [T[4], T[3], T[2]]
	: T extends [A, A, A, D, D, D, A, ...any] ? [T[5], T[4], T[3]]
	: T extends [A, A, D, D, A, A, A, ...any] ? [T[3], T[2]]
	: T extends [A, A, A, D, D, A, A, ...any] ? [T[4], T[3]]
	: T extends [A, A, A, D, A, A, A, ...any] ? [T[3]]
	: never;

export type SampleResultPart2 = SolvePart2<SampleInput>;
// export type ResultPart2 = SolvePart2<Input>;
