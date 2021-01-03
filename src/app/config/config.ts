export class Item {
  _id :String;
  name:String;
  price:Number;
  description:String;
  imgUrl:String;
  gender:String;
  classification:String;
  sizes:String;
  colors:string;
  purchases:Number;
  date:Date
  }
export class User {
  name:String;
  email:String;
  phone:String;
  gender:String;
  address:String
}
export class Order{
  itemId: String;
  itemName:String;
  itemPrice:String;
  itemGender:String;
  itemClassefication:String;
  itemSize:String;
  itemColor:String;
  itemImgUrl:String;
  itemPurchases : String;
  userName:String;
  userEmail:String;
  userPhone:String;
  userAddress:String;
  userId:String;
}