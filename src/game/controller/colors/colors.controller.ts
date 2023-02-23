import {injectable} from "inversify";

@injectable()
export class ColorsController {
  colors: string[][] = [
    ['#0D47A1', '#1565C0', '#1976D2', '#1E88E5', '#2196F3', '#42A5F5'],
    ['#2E7D32', '#1B5E20', '#388E3C', '#43A047', '#4CAF50', '#66BB6A'],
    ['#F57F17', '#F9A825', '#FBC02D', '#FDD835', '#FFEB3B', '#FFEE58'],
    ['#BF360C', '#D84315', '#E64A19', '#F4511E', '#FF5722', '#FF7043'],
    ['#4A148C', '#6A1B9A', '#7B1FA2', '#8E24AA', '#9C27B0', '#AB47BC'],
    ['#3E2723', '#4E342E', '#5D4037', '#6D4C41', '#795548', '#8D6E63'],
  ];

  getMain(id: number): string {
    return this.colors[id][0];
  }

  getAll(id: number): string[] {
    return this.colors[id];
  }
}
