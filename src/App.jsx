import { useEffect, useState } from "react";
import "./style.css";

/**
 * fetchNilaiObj
 *
 * fungsi untuk generate objek nilai mahasiswa
 * atau anggap saja sebagai dummy load dari api
 * @returns json nilai mahasiswa
 */
function fetchNilaiObj() {
    const jumlah_aspek_penilaian = 4;
    const jumlah_mahasiswa = 10;
    const nilai_aspek = {
        1: 1,
        2: 2,
        3: 6,
        4: 10,
    };
    let penilaian = [];
    for (let i = 1; i <= jumlah_mahasiswa; i++) {
        let data = { nama: "Mahasiswa " + i, id: "mahasiswa_" + i };
        for (let j = 1; j <= jumlah_aspek_penilaian; j++) {
            data["aspek_penilaian_" + j] = nilai_aspek[j];
        }
        penilaian.push(data);
    }
    return penilaian;
}

export default () => {
    const [penilaian, setPenilaian] = useState([]);
    useEffect(() => {
        const response = fetchNilaiObj();
        setPenilaian(response);
    }, []);

    /**
     * handleChange
     *
     * fungsi untuk handle setiap ada perubahan state
     * dari element select
     *
     * @param {int} index index dari state penilaian
     * @param {string} aspek string nama aspek penilaian
     * @param {string} value nilai baru untuk di update di state
     */
    function handleChange(index, aspek, value) {
        let temp = penilaian.slice();
        temp[index][aspek] = parseInt(value); // input select bertipe string, perlu diconvert ke int untuk disimpan
        setPenilaian(temp);
    }

    /**
     * opsi_nilai
     *
     * fungsi untuk generate komponen list
     * tidak saya buat komponen sendiri karena komponen masih simple
     * dan perlu fungsi dari on change yang perlu update state
     * @param {int} index index dari state penilaian
     * @param {string} aspek aspek penilaian siswa
     * @param {HTMLSelectElement} selectedValue elemen select yang nanti nya di ambil nilai terbaru untuk di update di state
     * @returns
     */
    function opsi_nilai(index, aspek, selectedValue) {
        let opsi = [];
        for (let i = 1; i <= 10; i++) {
            opsi.push(<option key={i}>{i}</option>);
        }
        return (
            <select
                onChange={(event) =>
                    handleChange(index, aspek, event.target.value)
                }
                value={selectedValue}
            >
                {opsi}
            </select>
        );
    }

    /**
     * simpan
     *
     * fungsi untuk transform state ke bentuk yang diinginkan
     * dalam kasus kali ini merujuk pada test teknis frontend
     */
    function simpan() {
        const aspek_penilaians = [
            "aspek_penilaian_1",
            "aspek_penilaian_2",
            "aspek_penilaian_3",
            "aspek_penilaian_4",
        ];
        let output = {};
        aspek_penilaians.forEach((aspek) => {
            if (!("aspek" in output)) {
                output[aspek] = {};
            }
            penilaian.forEach((penilaian) => {
                output[aspek][penilaian.id] = penilaian[aspek];
            });
        });

        // output test frontend
        console.log(output);
    }

    return (
        <>
            <div className="center">
                <h1>Aplikasi Penilaian Mahasiswa</h1>
            </div>
            <div className="container">
                <div className="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th colSpan="2"></th>
                                <th>Aspek penilaian 1</th>
                                <th>Aspek penilaian 2</th>
                                <th>Aspek penilaian 3</th>
                                <th>Aspek penilaian 4</th>
                            </tr>
                        </thead>
                        <tbody>
                            {penilaian.map((item, index) => (
                                <tr key={index}>
                                    <td className="no-gap">
                                        <img
                                            src="./user.svg"
                                            alt=""
                                            width="20"
                                        />
                                    </td>
                                    <td>{item.nama}</td>
                                    <td>
                                        {opsi_nilai(
                                            index,
                                            "aspek_penilaian_1",
                                            item.aspek_penilaian_1
                                        )}
                                    </td>
                                    <td>
                                        {opsi_nilai(
                                            index,
                                            "aspek_penilaian_2",
                                            item.aspek_penilaian_2
                                        )}
                                    </td>
                                    <td>
                                        {opsi_nilai(
                                            index,
                                            "aspek_penilaian_3",
                                            item.aspek_penilaian_3
                                        )}
                                    </td>
                                    <td>
                                        {opsi_nilai(
                                            index,
                                            "aspek_penilaian_4",
                                            item.aspek_penilaian_4
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button onClick={simpan}>Simpan</button>
            </div>
        </>
    );
};
