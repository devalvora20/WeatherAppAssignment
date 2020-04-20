package com.example.weatherapp;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentPagerAdapter;
import androidx.fragment.app.FragmentStatePagerAdapter;
import androidx.viewpager.widget.PagerAdapter;

import org.json.JSONObject;

import java.util.Map;

public class PlansPagerAdapter extends FragmentPagerAdapter {
    int mNumOfTabs;
    private long baseId = 0;
    Context context;
    String key;
    SharedPreferences pref;
    JSONObject data;
    JSONObject currentLocationData;
    String city;
    public PlansPagerAdapter(FragmentManager fm, int NumOfTabs, Context c, JSONObject currentLocationData, String city) {
        super(fm);
        this.city = city;
        this.context = c;
        this.mNumOfTabs = NumOfTabs;
        Log.d("current location data in planspage adapter constructor", currentLocationData.toString());
        this.currentLocationData = currentLocationData;
    }

    @Override
    public Fragment getItem(int position) {

        if(position==0){
            return DynamicFragment.newInstance(position,currentLocationData,context, true,city);
        }

        pref = context.getSharedPreferences("favorites",0);
        Map<String,?> favorites = pref.getAll();
        int i = 1;
        for (Map.Entry<String,?> entry : favorites.entrySet()){

            if(i==position){
                try {
                    key = entry.getKey();
                    data = new JSONObject(entry.getValue().toString());
                }catch (Throwable t){ Log.d("Error"," json error in getItem() plans adapter"); }
                break;
            }
            i++;

        }
        return DynamicFragment.newInstance(position,data,context,false,key);

    }

    @Override
    public int getCount() {
        return mNumOfTabs;
    }
    @Override
    public int getItemPosition(Object object) {
        // refresh all fragments when data set changed
        return PagerAdapter.POSITION_NONE;
    }
    @Override
    public long getItemId(int position) {
        // give an ID different from position when position has been changed
        return baseId + position;
    }

    public void notifyChangeInPosition(int n) {
        baseId += getCount() + n;
    }

    public void removeTabPage(String key){
        pref = context.getSharedPreferences("favorites",0);
        SharedPreferences.Editor editor = pref.edit();
        editor.remove(key);
        editor.commit();
        mNumOfTabs--;
        notifyChangeInPosition(1);
        notifyDataSetChanged();
    }
}