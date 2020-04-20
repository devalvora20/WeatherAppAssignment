package com.example.weatherapp;

import android.content.Context;
import android.widget.ArrayAdapter;

import java.util.ArrayList;

public class AutoCompleteAdapter extends ArrayAdapter {
    ArrayList<String> source;
    public AutoCompleteAdapter(Context context, int resource, ArrayList<String> citySource){
        super(context, resource, citySource);
        source = citySource;
    }

    @Override
    public int getCount() {
        return source.size();
    }

    @Override
    public String getItem(int position) {
        return source.get(position);
    }

    public void dataSetUpdated(ArrayList<String> l){
//        source.clear();
//        source.addAll(l);
        source = l;
        this.notifyDataSetChanged();
    }
}
