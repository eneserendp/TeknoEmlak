TEKNOEMLAK

TeknoEmlak, gayrimenkul sektöründe dijital dönüşümü hızlandırmayı amaçlayan yenilikçi bir platformdur. Bu proje, kullanıcıların mülk arama, inceleme ve randevu alma süreçlerini kolaylaştırmak için QR kod teknolojisi, çevrimiçi randevu sistemi ve sanal gezintiler gibi modern çözümler sunar.

Özellikler
QR Kod Entegrasyonu: Kullanıcılar, mülk ilanlarına hızlı ve kolay bir şekilde erişebilirler.
Çevrimiçi Randevu Sistemi: Kullanıcılar, emlak profesyonelleri ile kolayca randevu alabilirler.
Sanal Gezintiler: Kullanıcılar, mülkleri detaylı bir şekilde inceleyebilir ve sanal olarak gezebilirler.
Admin Paneli: Emlak ofisleri, ilanları yönetebilir, yeni ilanlar ekleyebilir ve QR kod oluşturabilirler.
Sipariş Takip Sistemi: Kullanıcılar, siparişlerini ve durumlarını takip edebilirler.
Kategoriler ve Footer Düzenleme: Emlak ofisleri, ilan kategorilerini ve footer bilgilerini düzenleyebilirler.
Kullanılan Teknolojiler
Front End:
React: Kullanıcı arayüzlerinin oluşturulması.
Next.js: Sunucu tarafı renderlama ve statik site üretimi.
Redux: Uygulama state yönetimi.
Next-Auth: Kimlik doğrulama ve oturum yönetimi.
Back End:
Node.js: Sunucu tarafı işlemler.
MongoDB: Veritabanı yönetimi.
Kurulum ve Kullanım
Gereksinimler:
Node.js
MongoDB

Adımlar:

git clone https://github.com/kullanıcı_adı/teknoemlak.git
cd teknoemlak
Gerekli Paketleri Yükleyin:

npm install
Geliştirme Sunucusunu Başlatın:

npm run dev
Veritabanı Bağlantısını Yapılandırın:

.env.local dosyasını oluşturun ve MongoDB bağlantı bilgilerinizi girin:

MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/teknoemlak?retryWrites=true&w=majority
Admin Paneline Erişim:

Tarayıcınızda http://localhost:3000/admin adresine gidin.
QR Kodları Oluşturma ve Yönetme:

İlan ekleme sayfasına giderek gerekli bilgileri girin ve QR kod oluşturun.
Proje Yapısı
pages/: Next.js sayfa bileşenleri.
components/: Yeniden kullanılabilir React bileşenleri.
lib/: Yardımcı fonksiyonlar ve yapılandırmalar.
models/: MongoDB modelleri.
styles/: Proje stil dosyaları.
public/: Statik dosyalar ve görseller.
Katkıda Bulunma
Katkılarınızı memnuniyetle karşılıyoruz! Herhangi bir hata bildirimi, iyileştirme önerisi veya yeni özellik ekleme talebi için lütfen bir "Issue" açın veya bir "Pull Request" gönderin.

Nasıl Katkıda Bulunabilirsiniz:
Bu projeyi forklayın.
Kendi branşınızı oluşturun (git checkout -b özellik/adiniz).
Değişikliklerinizi commitleyin (git commit -am 'Yeni özellik ekle').
Branşınıza push edin (git push origin özellik/adiniz).
Bir "Pull Request" açın.


Lisans

Bu proje MIT Lisansı ile lisanslanmıştır. Daha fazla bilgi için LICENSE dosyasına bakın.

TeknoEmlak, gayrimenkul sektöründe dijitalleşmeyi ve kullanıcı deneyimini iyileştirmeyi amaçlayan yenilikçi bir projedir. Katkılarınız ve geri bildirimleriniz için teşekkür ederiz!

Bu README dosyası, projeyi tanıtmak, kurulum talimatlarını vermek ve katkıda bulunmak isteyen kişilere rehberlik etmek için tasarlanmıştır. Umarım yardımcı olur!
