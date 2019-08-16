import Axios from "axios";
import fs from 'fs';
import path from 'path';
import logger from "../util/logger";
import rimraf from 'rimraf';

export function savePhotoByReference(photoRef: any, reviewID: string, cb: CallableFunction) {
    try {
        let filename = path.join('photos', `${reviewID.toString()}/`);
        logger.debug(filename)
        fs.mkdirSync(filename, { recursive: true })
    } catch (err) {
        if (err.code !== 'EEXIST') {
            console.log(err);
            cb(err.code)
        };
    }

    let promises = photoRef.map((refID: any) => {
        const url = `https://maps.googleapis.com/maps/api/place/photo?key=${process.env.GOOGLE_KEY}&photoreference=${refID}&maxheight=1000`;
        let photoPath = path.join('photos', reviewID.toString(), `${refID.toString()}.png`);
        return download_image(url, photoPath);
    })

    Promise.all(promises)
        .then(saved => {
            cb(null)
        })
        .catch(error => {
            cb(error)
        })
    // photoRef.forEach(async (refID: any) => {
    //     try {
    //         const url = `https://maps.googleapis.com/maps/api/place/photo?key=${process.env.GOOGLE_KEY}&photoreference=${refID}&maxheight=1000`;
    //         // const { data } = await Axios.get(url);
    //         // const photo = new myStream();
    //         // photo.push(data);
    //         let photoPath = path.join('photos', reviewID.toString(), `${refID.toString()}.png`);
    //         // console.log(photoPath);
    //         // const result = await fs.writeFileSync(photoPath, photo.read());
    //         // console.log(result);
    //         await download_image(url, photoPath)
    //     } catch (error) {
    //         cb(error);
    //     }
    // })
    //cb(null);

}


const download_image = (url: string, image_path: string) =>
    Axios({
        url,
        responseType: 'stream',
    }).then(
        response =>
            new Promise((resolve, reject) => {
                response.data
                    .pipe(fs.createWriteStream(image_path))
                    .on('finish', () => resolve())
                    .on('error', (e: any) => reject(e));
            }),
    );

export const delete_image = (id: string, cb: CallableFunction) => {
    try {
        const photoPath = path.join('photos', id)
        rimraf(photoPath, (error) => {
            if (error) {
                cb(error);
            }
            cb(null);
        })
    } catch (error) {
        cb(error)
    }

}
