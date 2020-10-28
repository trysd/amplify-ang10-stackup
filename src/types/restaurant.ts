export type Restaurant = {
  id: string,
  name: string,
  description: string,
  userId: string,
  city: string,
  addx?: Addx;
};

export type Addx = {
  id: string,
  ads: string
}
