package com.example.weatherapp;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class TodayFragment extends Fragment {
    Map<String,Integer> summaryIconMap =  new HashMap<>();
    TextView windSpeed;
    TextView pressure;
    TextView precipitation;
    TextView temperature;
    TextView humidity;
    TextView visibility;
    TextView cloudCover;
    TextView ozone;
    TextView summary;
    ImageView summaryIcon;
    final String degreeSymbol = ""+(char) 0x00B0;
    int position;
    static JSONObject detailedData;
    public static Fragment getInstance(int position, JSONObject obj) {
        detailedData = obj;
        Bundle bundle = new Bundle();
        bundle.putInt("pos", position);
        TodayFragment todayFragment = new TodayFragment();
        todayFragment.setArguments(bundle);
        return todayFragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        position = getArguments().getInt("pos");
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
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_today, container, false);

    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        windSpeed = view.findViewById(R.id.windSpeedValueToday);
        pressure = view.findViewById(R.id.pressureValueToday);
        precipitation = view.findViewById(R.id.precipitationValueToday);
        temperature = view.findViewById(R.id.temperatureValueToday);
        humidity = view.findViewById(R.id.humidityValueToday);
        visibility = view.findViewById(R.id.visibilityValueToday);
        cloudCover = view.findViewById(R.id.cloudCoverValueToday);
        ozone = view.findViewById(R.id.ozoneValueToday);
        summary = view.findViewById(R.id.summaryValueToday);
        summaryIcon = view.findViewById(R.id.summaryIconToday);

        try {
            JSONObject currently = new JSONObject( detailedData.get("currently").toString());
            String windSpeedVal = currently.has("windSpeed")?  String.format("%.2f", Double.parseDouble( currently.get("windSpeed").toString()))+" mph" : "N/A";
            String pressureVal = currently.has("pressure")?  String.format("%.2f", Double.parseDouble( currently.get("pressure").toString()))+" mb" : "N/A";
            String precipitationVal = currently.has("precipIntensity")?  String.format("%.2f", Double.parseDouble( currently.get("precipIntensity").toString()))+" mmph" : "N/A";
            String temperatureVal = currently.has("temperature")?  Math.round(Double.parseDouble( currently.get("temperature").toString()))+degreeSymbol+"F" : "N/A";
            String humidityVal = currently.has("humidity")?  Math.round( Double.parseDouble( currently.get("humidity").toString())*100)+" %" : "N/A";
            String visibilityVal = currently.has("visibility")?  String.format("%.2f", Double.parseDouble( currently.get("visibility").toString()))+" km" : "N/A";
            String cloudCoverVal = currently.has("cloudCover")?   Math.round( Double.parseDouble( currently.get("cloudCover").toString())*100)+" %" : "N/A";
            String ozoneVal = currently.has("ozone")? String.format("%.2f", Double.parseDouble( currently.get("ozone").toString()))+" DU" : "N/A";
            String summaryVal = currently.has("summary") ? currently.get("summary").toString():"N/A";
            summaryVal = summaryVal.contains("partly-")? summaryVal.replaceAll("partly-","") : summaryVal;
            summaryVal = summaryVal.contains("-")? summaryVal.replaceAll("-"," ") : summaryVal;

            summaryIcon.setImageResource(summaryIconMap.get(currently.get("icon")));
            windSpeed .setText(windSpeedVal);
            pressure .setText(pressureVal);
            precipitation .setText(precipitationVal);
            temperature .setText(temperatureVal);
            humidity .setText(humidityVal);
            visibility .setText(visibilityVal);
            cloudCover .setText(cloudCoverVal);
            ozone .setText(ozoneVal);
            summary .setText(summaryVal);

        }catch(Throwable t){Log.d("ERROR"," in fetching json data ");}

    }
}
