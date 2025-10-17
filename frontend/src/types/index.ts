export type EEGFrame = {
    timestamp: number;
    fs: number;
    n_channels: number;
    samples: number;
    data: number[][]; // [ch][sample]
    bands: { alpha: number; beta: number; theta: number; [k: string]: number };
    meditation_index: number;
};
