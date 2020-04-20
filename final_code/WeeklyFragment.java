package com.example.weatherapp;

import android.graphics.Color;
import android.media.Image;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.github.mikephil.charting.charts.LineChart;
import com.github.mikephil.charting.components.AxisBase;
import com.github.mikephil.charting.components.Legend;
import com.github.mikephil.charting.components.XAxis;
import com.github.mikephil.charting.components.YAxis;
import com.github.mikephil.charting.data.ChartData;
import com.github.mikephil.charting.data.Entry;
import com.github.mikephil.charting.data.LineData;
import com.github.mikephil.charting.data.LineDataSet;
import com.github.mikephil.charting.formatter.ValueFormatter;
import com.github.mikephil.charting.interfaces.datasets.ILineDataSet;
import com.github.mikephil.charting.utils.ColorTemplate;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class WeeklyFragment extends Fragment {
    int position;
    Map<String,Integer> summaryIconMap =  new HashMap<>();
    TextView summaryValueWeekly;
    ImageView summaryIconWeekly;
    static JSONObject detailedData;
    public static Fragment getInstance(int position, JSONObject obj) {
        detailedData = obj;
        Bundle bundle = new Bundle();
        bundle.putInt("pos", position);
        WeeklyFragment fragment = new WeeklyFragment();
        fragment.setArguments(bundle);
        return fragment;
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
        return inflater.inflate(R.layout.fragment_weekly, container, false);
    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        summaryIconWeekly = view.findViewById(R.id.summaryIconWeekly);
        summaryValueWeekly = view.findViewById(R.id.summaryValueWeekly);
        LineChart mLineChart = view.findViewById(R.id.chart1);


        // set custom labels and colors
//        l.setCustom(ColorTemplate.VORDIPLOM_COLORS, new String[] { "Set1", "Set2", "Set3", "Set4", "Set5" });
        try {
            JSONObject daily = new JSONObject(detailedData.get("daily").toString());

            summaryIconWeekly.setImageResource(summaryIconMap.get(daily.get("icon")));
            summaryValueWeekly.setText( daily.has("summary")?daily.get("summary").toString():"N/A" );

            JSONArray dailyData = daily.getJSONArray("data");
            setUpChart(mLineChart, dailyData);
            Log.d("daily ", daily.toString());
        }catch(Throwable t){Log.d("ERROR"," in fetching json data ");}
    }

    public void setUpChart(LineChart mLineChart, JSONArray dailyData){
        List<Entry> maxTemperatureValues = new ArrayList<>();
        List<Entry> minTemperatureValues = new ArrayList<>();
        final String[] days = new String[] { "0", "1", "2", "3", "4", "5", "6", "7" };
        ValueFormatter formatter = new ValueFormatter() {
            @Override
            public String getAxisLabel(float value, AxisBase axis) {
                return days[(int) value];
            }
        };
        XAxis xAxis = mLineChart.getXAxis();
        xAxis.setTextColor(R.color.white);
        xAxis.setGranularity(1f); // minimum axis-step (interval) is 1
        xAxis.setValueFormatter(formatter);

        for( int i = 0; i < dailyData.length(); i++){
            JSONObject dailyRow;
            try {
                dailyRow = dailyData.getJSONObject(i);
                Long temperatureHigh =  Math.round(Double.parseDouble( dailyRow.get("temperatureHigh").toString()));
                Long temperatureLow =  Math.round(Double.parseDouble( dailyRow.get("temperatureLow").toString()));
                Entry maxElement = new Entry(i, temperatureHigh);
                Entry minElement = new Entry(i, temperatureLow);
                maxTemperatureValues.add(maxElement);
                minTemperatureValues.add(minElement);
            }catch (Throwable t){Log.d("ERROR "," While chart data stuff");}
        }

        LineDataSet maxTemperatureSet = new LineDataSet(maxTemperatureValues, "Maximum Temperature");
        maxTemperatureSet.setColor(Color.rgb(250,171,26));
        maxTemperatureSet.setAxisDependency(YAxis.AxisDependency.LEFT);

        LineDataSet minTemperatureSet = new LineDataSet(minTemperatureValues, "Minimum Temperature");
        minTemperatureSet.setAxisDependency(YAxis.AxisDependency.LEFT);
        minTemperatureSet.setColor(Color.rgb(187,134,252));

        List<ILineDataSet> dataSets = new ArrayList<>();
        dataSets.add(minTemperatureSet);
        dataSets.add(maxTemperatureSet);

        LineData data = new LineData(dataSets);
        mLineChart.setData(data);
        mLineChart.invalidate();

        Legend l = mLineChart.getLegend();
        l.setFormSize(10f); // set the size of the legend forms/shapes
        l.setForm(Legend.LegendForm.SQUARE); // set what type of form/shape should be used

        l.setTextSize(16f);
        l.setXEntrySpace(15f); // set the space between the legend entries on the x-axis
        l.setYEntrySpace(5f); // set the space between the legend entries on the y-axis

        mLineChart.getAxisLeft().setTextColor(Color.rgb(123,123,123));
        mLineChart.getAxisRight().setTextColor(Color.rgb(123,123,123));
        mLineChart.getAxisLeft().setDrawGridLines(false);
        mLineChart.getAxisRight().setDrawGridLines(false);
        mLineChart.getXAxis().setDrawGridLines(false);
        mLineChart.getXAxis().setTextColor(Color.rgb(123,123,123));
        mLineChart.getLegend().setTextColor(Color.rgb(159,159,159));
    }

}
