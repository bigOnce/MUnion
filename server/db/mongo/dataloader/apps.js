import Apps from '../models/apps';
import Constant from '../constant';

export default function () {

    Apps
        .count()
        .exec((err, count) => {

            if (count > 0) {
                return;
            }

            const news = {
                appId: Constant.NEWS_APP_ID,
                name: 'VINA Báo',
                desc: 'Ứng dụng đọc tin tức hàng ngày',
                icons: [
                    {
                        src: 'http://icons',
                        w: 10,
                        h: 10
                    }
                ]
            };

            Apps.create([news], (error) => {
                if (!error) {
                    console.log('===> Apps bind success');
                }
            });

        });

}
