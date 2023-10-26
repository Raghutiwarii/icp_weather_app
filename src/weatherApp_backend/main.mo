import Map "mo:base/HashMap";
import Text "mo:base/Text";
import List "mo:base/List";


actor {

  stable var list:List.List<Text> = List.nil<Text>();

  public func put(data : Text) : async Text {
    list:= List.push(data,list);
    return data;
  };

  public func fetchList() : async List.List<Text>{
    return list;
  }

};