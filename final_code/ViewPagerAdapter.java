package com.example.weatherapp;

import android.util.Log;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentPagerAdapter;

import org.json.JSONObject;

public class ViewPagerAdapter extends FragmentPagerAdapter {
    private String title[] = {"TODAY", "WEEKLY", "PHOTOS"};
    private JSONObject detailedData;

    public ViewPagerAdapter(FragmentManager manager, JSONObject obj) {
        super(manager);
        detailedData = obj;
    }

    @Override
    public Fragment getItem(int position) {
        switch (position){
            case 0: return TodayFragment.getInstance(position,detailedData);
            case 1: return WeeklyFragment.getInstance(position,detailedData);
            case 2: return PhotosFragment.getInstance(position,detailedData);
        }
        return TodayFragment.getInstance(position,detailedData);
    }

    @Override
    public int getCount() {
        return title.length;
    }

    @Override
    public CharSequence getPageTitle(int position) {
        return title[position];
    }
}
