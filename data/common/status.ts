export abstract class Status {
  name: string;
  duration: number;
  description: string;
  type: string;
  mod?: number;
  
  public constructor(data: StatusData) {
    this.name = data.name;
    this.duration = data.duration;
    this.description = data.description;
    this.type = data.type;
    this.mod = data.mod;
  }

  public effect(): void {
    console.log(this.name);
  }
}

export interface StatusData {
  name: string;
  duration: number;
  description: string;
  type: string;
  mod?: number;
}