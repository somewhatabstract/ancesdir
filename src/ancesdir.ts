import {AncesdirFn, Options} from "./types";
import {normalizeOptions} from "./normalize-options";
import {findMarker} from "./find-marker";

export const ancesdir: AncesdirFn = (
    fromOrOptions?: string | Partial<Options>,
    maybeMarker?: string,
): string => {
    const options = normalizeOptions(fromOrOptions, maybeMarker);

    return findMarker(options);
};
