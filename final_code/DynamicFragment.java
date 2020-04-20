package com.example.weatherapp;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.cardview.widget.CardView;
import androidx.coordinatorlayout.widget.CoordinatorLayout;
import androidx.fragment.app.Fragment;
import androidx.viewpager.widget.ViewPager;

import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.tabs.TabLayout;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DynamicFragment extends Fragment {
    View view;
    String key;
    Map<String,Integer> summaryIconMap =  new HashMap<>();
    final String degreeSymbol = ""+(char) 0x00B0;
    String ENVIRONMENT_URL = "http://hw9backend-env.yvgs3r7x7g.us-east-2.elasticbeanstalk.com";
    String TAG = "DEBUG";
    private TabLayout tab;
    FloatingActionButton fab;
    private ViewPager viewPager;
    JSONObject card1Data = new JSONObject();
    JSONObject card2Data = new JSONObject();
    JSONObject currently;
    JSONObject daily;

    CardView card1View;
    List<String> stringList;
    static Boolean isCurrentLocation;
    String city;

    static JSONObject dataOfCity;
    static Context context;


    public static DynamicFragment newInstance(int val, JSONObject data, Context c, Boolean isCurrentLocationParameter, String key) {

        DynamicFragment fragment = new DynamicFragment();
        Bundle args = new Bundle();
        args.putInt("someInt", val);
        args.putString("data", data.toString());
        args.putBoolean("isCurrentLocation", isCurrentLocationParameter);
        args.putString("key", key);
        fragment.setArguments(args);
        context = c;
        return fragment;
    }

    int val;
    TextView c;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.test_layout, container, false);
        val = getArguments().getInt("someInt", 0);
        hideProgress();
        try {
            dataOfCity = new JSONObject(getArguments().getString("data",""));
            isCurrentLocation = getArguments().getBoolean("isCurrentLocation",false);
            key = getArguments().getString("key");
        }catch (Throwable t){Log.d("Error", "while taking from args in dynamic fragment");}

        fab = view.findViewById(R.id.fab_main_page);
        if(isCurrentLocation){

            fab.hide();
        }
        city = key;
        summaryIconMap.put("clear-day",R.drawable.weather_sunny);
        summaryIconMap.put("clear-night",R.drawable.weather_night);
        summaryIconMap.put("rain",R.drawable.weather_rainy);
        summaryIconMap.put("sleet",R.drawable.weather_snowy_rainy);
        summaryIconMap.put("snow",R.drawable.weather_snowy);
        summaryIconMap.put("wind",R.drawable.weather_windy_variant);
        summaryIconMap.put("fog",R.drawable.weather_fog);
        summaryIconMap.put("cloudy",R.drawable.weather_cloudy);
        summaryIconMap.put("partly-cloudy-night",R.drawable.weather_night_partly_cloudy);
        summaryIconMap.put("partly-cloudy-day",R.drawable.weather_partly_cloudy);
//        TextView tv = view.findViewById(R.id.tv);
//        tv.setText(val+"");
        card1View = view.findViewById(R.id.card1View);
        final ImageView iconImageView = view.findViewById(R.id.iconImg);
        final TextView temperatureTextView =  view.findViewById(R.id.temperature);
        final TextView summaryTextView =  view.findViewById(R.id.summary);
        final TextView cityTextView =  view.findViewById(R.id.city);
        final TextView humidityValueTextView =  view.findViewById(R.id.humidityValue);
        final TextView windSpeedValueTextView =  view.findViewById(R.id.windSpeedValue);
        final TextView visibilityValueTextView =  view.findViewById(R.id.visibilityValue);
        final TextView pressureValueTextView =  view.findViewById(R.id.pressureValue);

        try {


            currently = new JSONObject(dataOfCity.get("currently").toString());
            daily = new JSONObject( dataOfCity.get("daily").toString() );
            JSONArray dailyData = daily.getJSONArray("data");
            String temperatureVal = currently.has("temperature")?  Math.round(Double.parseDouble( currently.get("temperature").toString()))+degreeSymbol+"F" : "N/A";

            card1Data.put("icon",currently.get("icon"));
            card1Data.put("temperature",temperatureVal);
            card1Data.put("summary",currently.get("summary"));
            card1Data.put("city",city);
//                            spinner.setVisibility(View.GONE);

            iconImageView.setImageResource(summaryIconMap.get(currently.get("icon")));
            temperatureTextView.setText(temperatureVal);
            summaryTextView.setText((String)currently.get("summary"));
            cityTextView.setText(city);

            String humidityVal = currently.has("humidity")?  Math.round( Double.parseDouble( currently.get("humidity").toString())*100)+" %" : "N/A";

            String windSpeedVal = currently.has("windSpeed")?  String.format("%.2f", Double.parseDouble( currently.get("windSpeed").toString()))+" mph" : "N/A";

            String visibilityVal = currently.has("visibility")?  String.format("%.2f", Double.parseDouble( currently.get("visibility").toString()))+" km" : "N/A";

            String pressureVal = currently.has("pressure")?  String.format("%.2f", Double.parseDouble( currently.get("pressure").toString()))+" mb" : "N/A";


            card2Data.put("humidity",humidityVal);
            card2Data.put("windSpeed",windSpeedVal);
            card2Data.put("visibility",visibilityVal);
            card2Data.put("pressure",pressureVal);

            humidityValueTextView.setText(""+card2Data.get("humidity"));
            windSpeedValueTextView.setText(""+card2Data.get("windSpeed"));
            visibilityValueTextView.setText(""+card2Data.get("visibility"));
            pressureValueTextView.setText(""+card2Data.get("pressure"));

            addDataToCard3Table(dailyData);

        }catch (Throwable t){
            Log.d("Error","json in error card1 or card2 in dynamic fragment");
        }
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                removeTab();
                Toast.makeText(context,key+" was removed from favorites",Toast.LENGTH_SHORT).show();
            }
        });
        card1View.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                gotoDetails(view);
            }
        });
        return view;
    }
    public void addDataToCard3Table(JSONArray dailyData){
        TableLayout card3TableLayout = view.findViewById(R.id.card3Table);
        for( int i = 0; i < dailyData.length(); i++){
            JSONObject dailyRow;
            try {
                dailyRow = dailyData.getJSONObject(i);

                TableRow row= new TableRow(context);
                TableRow.LayoutParams lp = new TableRow.LayoutParams(TableRow.LayoutParams.WRAP_CONTENT);
                row.setLayoutParams(lp);

                TextView card3DateTextView = new TextView(context);
                TextView card3MinTextView = new TextView(context);
                TextView card3MaxTextView = new TextView(context);
                ImageView card3IconImageView = new ImageView(context);

                card3DateTextView.setTextColor(getResources().getColor(R.color.white));
                card3MinTextView.setTextColor(getResources().getColor(R.color.white));
                card3MaxTextView.setTextColor(getResources().getColor(R.color.white));
                card3DateTextView.setTextSize(getResources().getDimension(R.dimen.tableText));
                card3MinTextView.setTextSize(getResources().getDimension(R.dimen.tableText));
                card3MaxTextView.setTextSize(getResources().getDimension(R.dimen.tableText));
                card3IconImageView.setPadding(55,55,55,55);
                card3DateTextView.setPadding(55,55,55,15);



                Date fullDate = new Date(Long.parseLong(dailyRow.get("time").toString()) * 1000);
                String date = (fullDate.getMonth()+1) + "/" + fullDate.getDate() + "/" + (1900+fullDate.getYear());
                double min = Double.parseDouble( dailyRow.get("temperatureLow").toString());
                double max = Double.parseDouble( dailyRow.get("temperatureHigh").toString());

                card3DateTextView.setText(date);
                card3IconImageView.setImageResource(summaryIconMap.get(dailyRow.get("icon")));
                card3MinTextView.setText(Math.round(min)+"");
                card3MaxTextView.setText(Math.round(max)+"");

                row.addView(card3DateTextView);
                row.addView(card3IconImageView);
                row.addView(card3MinTextView);
                row.addView(card3MaxTextView);
                row.setBackgroundResource(R.drawable.table_border);
                card3TableLayout.addView(row,i);
            }catch (Throwable t){ Log.d("ERROR"," Error while adding to table ");}
        }
    }

    public void removeTab() {
        ((MainActivity)getActivity()).removeTab(val, key);
    }

    public void gotoDetails(View view){
        Intent detailsIntent = new Intent(context, DetailedInformation.class);
        JSONObject detailedData = new JSONObject();
        try {
            detailedData.put("currently", currently);
            detailedData.put("daily", daily);
            detailedData.put("city", city);
        }catch (Throwable t){ Log.d("Error"," while putting data to send to other intent "); }
//        detailsIntent.putExtra("currently",currently.toString());
        detailsIntent.putExtra("data",detailedData.toString());
        startActivity(detailsIntent);
    }


    public void hideProgress(){
        ((MainActivity)getActivity()).hideProgress();
    }
}
