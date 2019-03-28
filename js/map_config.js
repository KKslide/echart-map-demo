var geoCoordMap = {
    "清远市": [112.9175, 24.3292],
    "韶关市": [113.7964, 24.7028],
    "湛江市": [110.0077, 21.0894],
    "梅州市": [116.1255, 24.1534],
    "河源市": [114.917, 23.9722],
    "肇庆市": [112.1265, 23.5822],
    "惠州市": [114.5204, 23.2647],
    "茂名市": [111.0059, 22.0221],
    "江门市": [112.6318, 22.3884],
    "阳江市": [111.8298, 22.0715],
    "云浮市": [111.7859, 22.8516],
    "广州市": [113.5107, 23.2896],
    "汕尾市": [115.5762, 23.0438],
    "揭阳市": [116.1255, 23.313],
    "珠海市": [113.253, 22.165],
    "佛山市": [112.9855, 23.0197],
    "潮州市": [116.7847, 23.8293],
    "汕头市": [116.69, 23.39],
    "深圳市": [114.2035, 22.6039],
    "东莞市": [113.8953, 22.951],
    "中山市": [113.4229, 22.578],
}
var data = [
    { name: '清远市', value: [45, '45%'] },
    { name: '韶关市', value: [39, '88%'] },
    { name: '湛江市', value: [87, '55%'] },
    { name: '梅州市', value: [59, '79%'] },
    { name: '河源市', value: [89, '44%'] },
    { name: '肇庆市', value: [52, '33%'] },
    { name: '惠州市', value: [9, '26%'] },
    { name: '茂名市', value: [35, '65%'] },
    { name: '江门市', value: [87, '44%'] },
    { name: '阳江市', value: [39, '15%'] },
    { name: '云浮市', value: [33, '14%'] },
    { name: '广州市', value: [95, '23%'] },
    { name: '揭阳市', value: [13, '14%'] },
    { name: '珠海市', value: [56, '89%'] },
    { name: '佛山市', value: [25, '93%'] },
    { name: '潮州市', value: [67, '44%'] },
    { name: '汕头市', value: [33, '55%'] },
    { name: '深圳市', value: [15, '49%'] },
    { name: '东莞市', value: [78, '88%'] },
    { name: '中山市', value: [16, '14%'] },
    { name: '汕尾市', value: [45, '25%'] }
];
var max = 480, min = 9; // todo 
var maxSize4Pin = 100, minSize4Pin = 30;

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};

var getCityVal = function (name) {
    var _name = name;
    for (let i = 0; i < data.length; i++) {
        if (data[i].name == _name) {
            return data[i].value;
        }
    }
}

var option = {
    title: { //标题
        show: false,
        text: 'Demo - 广东省',
        x: 'center',
        textStyle: {
            color: '#ccc'
        }
    },
    tooltip: { // 鼠标悬停时的tip显示
        trigger: 'item',
        formatter: function (params) { // tip格式重组
            return params.data.value[1]
            // if (typeof (params.value)[2] == "undefined") {
            //     return params.name + ' : ' + params.value;
            // } else {
            //     return params.name + ' : ' + params.value[2];
            // }
        }
    },
    legend: { // 控制要显示的tip
        // show:false,
        orient: 'vertical',
        y: 'top',
        x: 'left',
        data: ['DATA'],
        textStyle: {
            color: '#000'
        }
    },
    visualMap: { // 视觉映射组件
        show: false,
        min: 0,
        max: 100,
        left: 'left',
        top: 'bottom',
        text: ['Height', 'Low'], // 文本，默认为数值文本
        calculable: true,
        seriesIndex: [0],
        inRange: {
            color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
        }
    },
    geo: { // 地图
        show: true,
        map: 'guangdong',
        center: [112.9855, 23.0197],
        label: {
            normal: {
                show: false
            },
            emphasis: {
                show: false,
            }
        },
        roam: true,
        itemStyle: {
            normal: {
                areaColor: '#031525',
                borderColor: '#3B5077',
            },
            emphasis: {
                areaColor: '#2B91B7',
            }
        }
    },
    series: [
        { // 散点（气泡）图
            name: 'DATA',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            // symbolSize: function (val) {
            //     return val[2] / 10;
            // },
            symbolSize: 10, // 大小
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'bottom',
                    show: true,
                    color: "#FFF",
                    backgroundColor: "rgba(0,0,0,.5)"
                },
                emphasis: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    color: '#05C3F9'
                }
            }
        },
        { // 城市区块配置
            type: 'map',
            map: 'guangdong',
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false,
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            roam: false,
            itemStyle: { // 地图块颜色配置
                normal: {
                    areaColor: '#031525', // 城市颜色
                    borderColor: '#3B5077', // 边界颜色
                },
                emphasis: {
                    areaColor: '#2B91B7' // 鼠标悬停或点击时的颜色
                }
            },
            animation: true,
            data: data
        },
        { // 水滴点
            name: '点',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'pin',
            // symbolSize: function (val) {
            //     var a = (maxSize4Pin - minSize4Pin) / (max - min);
            //     var b = minSize4Pin - a * min;
            //     b = maxSize4Pin - a * max;
            //     return a * val[2] + b;
            // },
            symbolSize: 40,
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        color: '#fff',
                        fontSize: 9,
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#F62157', //标志颜色
                }
            },
            zlevel: 6,
            data: convertData(data),
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    // console.log(params);
                }
            }
        },
        {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(data.sort(function (a, b) {
                return b.value - a.value;
            }).slice(0, 5)),
            symbolSize: function (val) {
                return val[2] / 10;
            },
            showEffectOn: 'none',
            rippleEffect: {
                brushType: 'none'
            },
            // show:false,
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    color: '#05C3F9',
                    shadowBlur: 10,
                    shadowColor: '#05C3F9'
                }
            },
            zlevel: 1
        },

    ]
};