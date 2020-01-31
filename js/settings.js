export const settings = {
  options: {
    iterator: 20,
    defaultColor: 0xF6831E,
  },
  rules: [
    { id: 0, directionArray: [], color: '#DFC3B8', edge: { min: 2.5, max: 10 }, area: { min: 6.25, max: 15 }, neighbor: [1, 3], name: "Ön Geçiş Alanı" }, // Açık Pembe
    { id: 1, directionArray: [], color: '#57698F', edge: { min: 3.75, max: 20 }, area: { min: 10.32, max: 30 }, neighbor: [0, 2], name: "Hol (Danışma dahil)" }, // Mavi
    { id: 2, directionArray: [], color: '#A9AA70', edge: { min: 2.90, max: 10 }, area: { min: 8.41, max: 15 }, neighbor: [1, 4], name: "Personel Dinlenme Odası" }, // Yeşil
    { id: 3, directionArray: [], color: '#97949F', edge: { min: 7.65, max: 15 }, area: { min: 91.80, max: 100 }, neighbor: [0], name: "Yoğun Bakım Alanı A" }, // Mor
    { id: 4, directionArray: [], color: '#F4988A', edge: { min: 1.20, max: 20 }, area: { min: 3, max: 10 }, neighbor: [2], name: "Personel WC" }, // kırmızı
  ],
  directions: [
    { id: 0, x: 1, y: 1, name: "left" },
    { id: 1, x: -1, y: 1, name: "right" },
    { id: 2, x: -1, y: -1, name: "top" },
    { id: 3, x: 1, y: -1, name: "bottom" }
  ]
}