
export type TexturesGeneratorConfig = {
  playerCount: number
};

export interface TexturesGeneratorPixiInterface {
  generate(config: TexturesGeneratorConfig): void
}
