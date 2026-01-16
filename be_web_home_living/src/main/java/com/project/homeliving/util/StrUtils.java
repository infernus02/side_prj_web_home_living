package com.project.homeliving.util;

public class StrUtils {
    public static String toString(String str){
        if(str == null || str.isEmpty())
            return null;
        return str.trim();
    }
}
