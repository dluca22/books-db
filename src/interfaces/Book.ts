export interface Book {
    id:number,
    title:string,
    category: 'avventura' | 'saggio' | 'fantasy',
    author: string,
    pages: number
}