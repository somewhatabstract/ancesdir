export const throwStartingPathNotAbsoluteMessage = (from: string): never => {
    throw new Error(
        `The starting path must be absolute, but "${from}" is relative`,
    );
};

export const throwMarkerNotFoundMessage = (
    from: string,
    marker: string,
): never => {
    throw new Error(
        `Could not find marker, "${marker}", from given starting location "${from}"`,
    );
};
